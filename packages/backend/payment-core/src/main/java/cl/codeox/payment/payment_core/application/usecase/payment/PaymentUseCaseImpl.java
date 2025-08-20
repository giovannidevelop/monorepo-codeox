package cl.codeox.payment.payment_core.application.usecase.payment;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cl.codeox.payment.payment_core.domain.payment.Payment;
import cl.codeox.payment.payment_core.domain.payment.PaymentStatus;
import cl.codeox.payment.payment_core.port.in.payment.PaymentConflictException;
import cl.codeox.payment.payment_core.port.in.payment.PaymentNotFoundException;
import cl.codeox.payment.payment_core.port.in.payment.PaymentUseCase;
import cl.codeox.payment.payment_core.port.out.payment.PaymentRepositoryPort;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentUseCaseImpl implements PaymentUseCase {

  private final PaymentRepositoryPort repository;

  // ------------------- Lecturas / listados -------------------
  @Override
  @Transactional(readOnly = true)
  public List<Payment> listAll() {
    return repository.findAll();
  }

  @Override
  @Transactional(readOnly = true)
  public List<Payment> listByStatus(PaymentStatus status) {
    return repository.findByStatus(status);
  }

  @Override
  @Transactional(readOnly = true)
  public List<Payment> listPage(int offset, int limit) {
    return repository.findAllOrderByCreatedAtDesc(offset, limit);
  }

  @Override
  @Transactional(readOnly = true)
  public List<Payment> listByStatusPage(PaymentStatus status, int offset, int limit) {
    return repository.findByStatusOrderByCreatedAtDesc(status, offset, limit);
  }

  @Override
  @Transactional(readOnly = true)
  public List<Payment> listCreatedBetween(Instant fromInclusive, Instant toExclusive) {
    return repository.findByCreatedAtBetween(fromInclusive, toExclusive);
  }

  // ------------------- Búsquedas puntuales -------------------
  @Override
  @Transactional(readOnly = true)
  public Payment get(Long id) {
    return repository.findById(id).orElseThrow(() -> new PaymentNotFoundException(id));
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<Payment> findByCommerceOrder(String commerceOrder) {
    return repository.findByCommerceOrder(commerceOrder);
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<Payment> findByToken(String token) {
    return repository.findByToken(token);
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<Payment> findByFlowOrder(Long flowOrder) {
    return repository.findByFlowOrder(flowOrder);
  }

  // ------------------- Mutaciones -------------------
  @Override
  public Payment create(Payment payment) {
    // defaults
    if (payment.getStatus() == null) {
      payment.setStatus(PaymentStatus.PENDING);
    }

    // unicidades
    if (payment.getCommerceOrder() != null && repository.existsByCommerceOrder(payment.getCommerceOrder())) {
      throw new PaymentConflictException("commerceOrder ya existe: " + payment.getCommerceOrder());
    }
    if (payment.getToken() != null && repository.existsByToken(payment.getToken())) {
      throw new PaymentConflictException("token ya existe: " + payment.getToken());
    }

    return repository.save(payment);
  }

  @Override
  public Payment update(Long id, Payment input) {
    Payment current = repository.findById(id).orElseThrow(() -> new PaymentNotFoundException(id));

    // Si permiten cambiar commerceOrder/token, validar unicidad cuando cambian
    if (input.getCommerceOrder() != null && !input.getCommerceOrder().equals(current.getCommerceOrder())) {
      if (repository.existsByCommerceOrder(input.getCommerceOrder())) {
        throw new PaymentConflictException("commerceOrder ya existe: " + input.getCommerceOrder());
      }
      current.setCommerceOrder(input.getCommerceOrder());
    }
    if (input.getToken() != null && !input.getToken().equals(current.getToken())) {
      if (repository.existsByToken(input.getToken())) {
        throw new PaymentConflictException("token ya existe: " + input.getToken());
      }
      current.setToken(input.getToken());
    }

    // Campos editables habituales
    if (input.getSubject() != null) current.setSubject(input.getSubject());
    if (input.getCurrency() != null) current.setCurrency(input.getCurrency());
    if (input.getAmount() != null) current.setAmount(input.getAmount());
    if (input.getEmail() != null) current.setEmail(input.getEmail());
    if (input.getFlowOrder() != null) current.setFlowOrder(input.getFlowOrder());
    if (input.getRequestDate() != null) current.setRequestDate(input.getRequestDate());
    if (input.getRawProviderStatus() != null) current.setRawProviderStatus(input.getRawProviderStatus());
    if (input.getStatus() != null) current.setStatus(input.getStatus()); // si prefieres controlar por endpoint aparte, quítalo

    return repository.save(current);
  }

  @Override
  public Payment updateStatus(Long id, PaymentStatus newStatus, String rawProviderStatus) {
    Payment p = repository.findById(id).orElseThrow(() -> new PaymentNotFoundException(id));
    p.setStatus(newStatus);
    p.setRawProviderStatus(rawProviderStatus);
    return repository.save(p);
  }

  @Override
  public void delete(Long id) {
    // opcional: validar existencia antes de borrar
    if (!repository.existsById(id)) {
      throw new PaymentNotFoundException(id);
    }
    repository.deleteById(id);
  }

  // ------------------- Misceláneos -------------------
  @Override
  @Transactional(readOnly = true)
  public boolean existsByCommerceOrder(String commerceOrder) {
    return repository.existsByCommerceOrder(commerceOrder);
  }

  @Override
  @Transactional(readOnly = true)
  public boolean existsByToken(String token) {
    return repository.existsByToken(token);
  }

  @Override
  @Transactional(readOnly = true)
  public long count() {
    return repository.count();
  }
}
