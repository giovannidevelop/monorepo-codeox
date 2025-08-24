package cl.fromenryac.vendedorsupremo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

@Tag(name = "Tracker", description = "Seguimiento de chats, etapas y embudo (in-memory)")
@RestController
@RequestMapping("/api/tracker")
public class TrackerController {

    // ===== In-memory storage (temporal) =====
    private static final Map<String, Chat> CHATS = new ConcurrentHashMap<>();
    private static final List<Event> EVENTS = new CopyOnWriteArrayList<>();

    // ===== Enums =====
    public enum Stage { DISCOVERY, QUALIFICATION, PROPOSAL, CLOSING, WON, LOST }
    public enum EventType { STAGE_CHANGE, NOTE, MESSAGE_IN, MESSAGE_OUT }

    // ===== DTOs =====
    public static class TrackEventRequest {
        @NotBlank public String waPhone;
        public String type;   // STAGE_CHANGE | NOTE | MESSAGE_IN | MESSAGE_OUT
        public String stage;  // DISCOVERY|QUALIFICATION|PROPOSAL|CLOSING|WON|LOST
        public String note;   // texto libre
    }

    public static class OkResponse {
        public boolean ok = true;
        public String message;
        public OkResponse() {}
        public OkResponse(String msg) { this.message = msg; }
    }

    public static class ChatSummary {
        public String waPhone;
        public Stage stage;
        public boolean open;
        public Instant lastMessageAt;

        public ChatSummary(String waPhone, Stage stage, boolean open, Instant lastMessageAt) {
            this.waPhone = waPhone;
            this.stage = stage;
            this.open = open;
            this.lastMessageAt = lastMessageAt;
        }
    }

    // ===== Models (in-memory) =====
    static class Chat {
        String waPhone;
        Stage stage = Stage.DISCOVERY;
        boolean open = true;
        Instant lastMessageAt = Instant.now();
    }

    static class Event {
        String waPhone;
        EventType type;
        Stage stage;       // opcional segun el tipo
        String note;       // opcional
        Instant at = Instant.now();
    }

    // ===== Helpers =====
    private static Stage parseStageOrNull(String s) {
        if (s == null) return null;
        try {
            return Stage.valueOf(s.trim().toUpperCase());
        } catch (IllegalArgumentException ex) {
            return null;
        }
    }

    private static EventType parseTypeOrDefault(String s, boolean hasStage) {
        if (s == null || s.isBlank()) {
            return hasStage ? EventType.STAGE_CHANGE : EventType.NOTE;
        }
        try {
            return EventType.valueOf(s.trim().toUpperCase());
        } catch (IllegalArgumentException ex) {
            return hasStage ? EventType.STAGE_CHANGE : EventType.NOTE;
        }
    }

    // ===== Endpoints =====

    @Operation(summary = "Registrar evento de tracker (cambia etapa, agrega nota o marca mensaje)")
    @PostMapping("/events")
    public ResponseEntity<OkResponse> trackEvent(@RequestBody TrackEventRequest req) {
        if (req == null || req.waPhone == null || req.waPhone.isBlank()) {
            return ResponseEntity.badRequest().body(new OkResponse("Falta waPhone"));
        }

        Stage newStage = parseStageOrNull(req.stage);
        EventType type = parseTypeOrDefault(req.type, newStage != null);

        // upsert chat
        Chat chat = CHATS.computeIfAbsent(req.waPhone, k -> {
            Chat c = new Chat();
            c.waPhone = k;
            return c;
        });

        // actualizar chat por tipo/etapa
        if (newStage != null) {
            chat.stage = newStage;
            // cerrar si WON/LOST
            chat.open = !(newStage == Stage.WON || newStage == Stage.LOST);
        }
        chat.lastMessageAt = Instant.now();

        // registrar evento
        Event ev = new Event();
        ev.waPhone = req.waPhone;
        ev.type = type;
        ev.stage = newStage;
        ev.note = req.note;
        ev.at = Instant.now();
        EVENTS.add(ev);

        return ResponseEntity.ok(new OkResponse("Evento registrado"));
    }

    @Operation(summary = "Listar chats por estado (open|closed|all). Default: open")
    @GetMapping("/chats")
    public List<ChatSummary> listChats(@RequestParam(name = "status", required = false, defaultValue = "open") String status) {
        String s = status.trim().toLowerCase(Locale.ROOT);
        return CHATS.values().stream()
                .filter(c ->
                        switch (s) {
                            case "open" -> c.open;
                            case "closed" -> !c.open;
                            default -> true; // all
                        }
                )
                .sorted(Comparator.comparing((Chat c) -> c.lastMessageAt).reversed())
                .map(c -> new ChatSummary(c.waPhone, c.stage, c.open, c.lastMessageAt))
                .collect(Collectors.toList());
    }

    @Operation(summary = "Embudo (conteo por etapa actual)")
    @GetMapping("/funnel")
    public Map<String, Integer> funnel() {
        Map<String, Integer> out = new LinkedHashMap<>();
        for (Stage st : Stage.values()) out.put(st.name(), 0);
        CHATS.values().forEach(c -> out.compute(c.stage.name(), (k, v) -> (v == null ? 0 : v) + 1));
        return out;
    }
}
