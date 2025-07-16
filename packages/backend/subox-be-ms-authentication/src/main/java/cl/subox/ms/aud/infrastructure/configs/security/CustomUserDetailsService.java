package cl.subox.ms.aud.infrastructure.configs.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

import cl.subox.ms.aud.domain.model.entities.RoleModel;
import cl.subox.ms.aud.domain.model.entities.UserModel;
import cl.subox.ms.aud.domain.ports.out.UserRepositoryPort;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    // private static final Logger logger =
    // LoggerFactory.getLogger(CustomUserDetailsService.class);

    @Autowired
    private UserRepositoryPort userRepositoryPort;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserModel user = userRepositoryPort
                .findByUsername(username)
                .orElseThrow(
                        () -> new UsernameNotFoundException("Username not found"));
        UserDetailsImpl userDetails = new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                mapRolesToAuthorities(user.getRoles()));

        return userDetails;
    }

    private Collection<GrantedAuthority> mapRolesToAuthorities(Set<RoleModel> list) {
        if (list != null) {
            return list.stream()
                    .map(role -> new SimpleGrantedAuthority(role.getName().toString()))
                    .collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }

}