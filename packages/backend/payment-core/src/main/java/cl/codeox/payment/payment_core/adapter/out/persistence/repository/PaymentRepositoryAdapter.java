package cl.codeox.payment.payment_core.adapter.out.persistence.repository;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import cl.codeox.payment.payment_core.adapter.out.persistence.entity.payment.PaymentEntity;
import cl.codeox.payment.payment_core.adapter.out.persistence.jpa.payment.PaymentJpaRepository;
import cl.codeox.payment.payment_core.domain.payment.Payment;
import cl.codeox.payment.payment_core.domain.payment.PaymentStatus;
import cl.codeox.payment.payment_core.port.out.payment.PaymentRepositoryPort;
import cl.codeox.payment.payment_core.port.out.payment.PaymentSearchCriteria;

@Component
public class PaymentRepositoryAdapter implements PaymentRepositoryPort {

    private final PaymentJpaRepository jpaRepository;

    public PaymentRepositoryAdapter(PaymentJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    // -------- Mapping Entity <-> Domain --------
    private Payment mapToModel(PaymentEntity e) {
        if (e == null) return null;
        return Payment.builder()
                .id(e.getId())
                .commerceOrder(e.getCommerceOrder())
                .flowOrder(e.getFlowOrder())
                .token(e.getToken())
                .subject(e.getSubject())
                .currency(e.getCurrency())
                .amount(e.getAmount())
                .email(e.getEmail())
                .status(e.getStatus())
                .rawProviderStatus(e.getRawProviderStatus())
                .requestDate(e.getRequestDate())
                .createdAt(e.getCreatedAt())
                .updatedAt(e.getUpdatedAt())
                .build();
    }

    private PaymentEntity mapToEntity(Payment p) {
        if (p == null) return null;
        return PaymentEntity.builder()
                .id(p.getId())
                .commerceOrder(p.getCommerceOrder())
                .flowOrder(p.getFlowOrder())
                .token(p.getToken())
                .subject(p.getSubject())
                .currency(p.getCurrency())
                .amount(p.getAmount())
                .email(p.getEmail())
                .status(p.getStatus())
                .rawProviderStatus(p.getRawProviderStatus())
                .requestDate(p.getRequestDate())
                // createdAt/updatedAt los maneja @CreationTimestamp/@UpdateTimestamp
                .build();
    }

    private List<Payment> mapToModelList(List<PaymentEntity> entities) {
        return entities.stream().map(this::mapToModel).collect(Collectors.toList());
    }

    private Pageable toPageable(int offset, int limit) {
        int size = (limit <= 0) ? 50 : limit;
        int page = (offset <= 0) ? 0 : (offset / size);
        return PageRequest.of(page, size);
    }

    // -------- Implementación del Port --------
    @Override
    public Payment save(Payment payment) {
        PaymentEntity saved = jpaRepository.save(mapToEntity(payment));
        return mapToModel(saved);
    }

    @Override
    public List<Payment> saveAll(Collection<Payment> payments) {
        List<PaymentEntity> toSave = payments.stream().map(this::mapToEntity).collect(Collectors.toList());
        return jpaRepository.saveAll(toSave).stream().map(this::mapToModel).collect(Collectors.toList());
    }

    @Override
    public Optional<Payment> findById(Long id) {
        return jpaRepository.findById(id).map(this::mapToModel);
    }

    @Override
    public List<Payment> findAll() {
        return mapToModelList(jpaRepository.findAll());
    }

    @Override
    public boolean existsById(Long id) {
        return jpaRepository.existsById(id);
    }

    @Override
    public long count() {
        return jpaRepository.count();
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public void delete(Payment payment) {
        jpaRepository.delete(mapToEntity(payment));
    }

    @Override
    public void deleteAllById(Collection<Long> ids) {
        ids.forEach(jpaRepository::deleteById);
    }

    @Override
    public void deleteAll() {
        jpaRepository.deleteAll();
    }

    @Override
    public Optional<Payment> findByCommerceOrder(String commerceOrder) {
        return jpaRepository.findByCommerceOrder(commerceOrder).map(this::mapToModel);
    }

    @Override
    public Optional<Payment> findByToken(String token) {
        return jpaRepository.findByToken(token).map(this::mapToModel);
    }

    @Override
    public Optional<Payment> findByFlowOrder(Long flowOrder) {
        return jpaRepository.findByFlowOrder(flowOrder).map(this::mapToModel);
    }

    @Override
    public List<Payment> findByStatus(PaymentStatus status) {
        return mapToModelList(jpaRepository.findByStatus(status));
    }

    @Override
    public List<Payment> findByStatusIn(Collection<PaymentStatus> statuses) {
        return mapToModelList(jpaRepository.findByStatusIn(statuses));
    }

    @Override
    public List<Payment> findByEmail(String email) {
        return mapToModelList(jpaRepository.findByEmail(email));
    }

    @Override
    public List<Payment> findByCreatedAtBetween(Instant fromInclusive, Instant toExclusive) {
        return mapToModelList(jpaRepository.findByCreatedAtBetween(fromInclusive, toExclusive));
    }

    @Override
    public List<Payment> findByStatusAndCreatedAtBetween(
            PaymentStatus status, Instant fromInclusive, Instant toExclusive) {
        return mapToModelList(jpaRepository.findByStatusAndCreatedAtBetween(status, fromInclusive, toExclusive));
    }

    @Override
    public boolean existsByCommerceOrder(String commerceOrder) {
        return jpaRepository.existsByCommerceOrder(commerceOrder);
    }

    @Override
    public boolean existsByToken(String token) {
        return jpaRepository.existsByToken(token);
    }

    @Override
    public List<Payment> findAllOrderByCreatedAtDesc(int offset, int limit) {
        return jpaRepository.findAllByOrderByCreatedAtDesc(toPageable(offset, limit))
                .getContent().stream().map(this::mapToModel).collect(Collectors.toList());
    }

    @Override
    public List<Payment> findByStatusOrderByCreatedAtDesc(PaymentStatus status, int offset, int limit) {
        return jpaRepository.findByStatusOrderByCreatedAtDesc(status, toPageable(offset, limit))
                .getContent().stream().map(this::mapToModel).collect(Collectors.toList());
    }

    @Override
    public List<Payment> search(PaymentSearchCriteria criteria, int offset, int limit) {
        // Si no hay criterios, devolver página por createdAt DESC
        if (criteria == null) {
            return jpaRepository.findAll(PageRequest.of(pageFrom(offset, limit), sizeFrom(limit),
                            Sort.by("createdAt").descending()))
                    .getContent().stream().map(this::mapToModel).collect(Collectors.toList());
        }

        Specification<PaymentEntity> spec = Specification.where(null);

        if (!isBlank(criteria.commerceOrder())) {
            spec = spec.and((root, q, cb) ->
                    cb.equal(root.get("commerceOrder"), criteria.commerceOrder()));
        }
        if (!isBlank(criteria.token())) {
            spec = spec.and((root, q, cb) ->
                    cb.equal(root.get("token"), criteria.token()));
        }
        if (criteria.flowOrder() != null) {
            spec = spec.and((root, q, cb) ->
                    cb.equal(root.get("flowOrder"), criteria.flowOrder()));
        }
        if (!isBlank(criteria.email())) {
            spec = spec.and((root, q, cb) ->
                    cb.equal(cb.lower(root.get("email")), criteria.email().toLowerCase()));
        }
        if (criteria.status() != null) {
            spec = spec.and((root, q, cb) ->
                    cb.equal(root.get("status"), criteria.status()));
        }
        if (criteria.createdFrom() != null && criteria.createdTo() != null) {
            spec = spec.and((root, q, cb) ->
                    cb.between(root.get("createdAt"), criteria.createdFrom(), criteria.createdTo()));
        } else if (criteria.createdFrom() != null) {
            spec = spec.and((root, q, cb) ->
                    cb.greaterThanOrEqualTo(root.get("createdAt"), criteria.createdFrom()));
        } else if (criteria.createdTo() != null) {
            spec = spec.and((root, q, cb) ->
                    cb.lessThan(root.get("createdAt"), criteria.createdTo()));
        }

        var pageable = PageRequest.of(pageFrom(offset, limit), sizeFrom(limit), Sort.by("createdAt").descending());
        return jpaRepository.findAll(spec, pageable).getContent()
                .stream().map(this::mapToModel).collect(Collectors.toList());
    }

    // ---- helpers ----
    private boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }

    private int pageFrom(int offset, int limit) {
        int size = sizeFrom(limit);
        return (offset <= 0) ? 0 : (offset / size);
        // si prefieres "offset real", cambia a PageRequest.of(offset/size, size)
    }

    private int sizeFrom(int limit) {
        return (limit <= 0) ? 50 : limit;
    }
}
