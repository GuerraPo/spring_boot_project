package tlc.gab.ims.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private DataSource dataSource;

    @Value("${spring.queries.users-query}")
    private String usersQuery;

    @Value("${spring.queries.roles-query}")
    private String rolesQuery;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().usersByUsernameQuery(usersQuery).authoritiesByUsernameQuery(rolesQuery)
                .dataSource(dataSource).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.authorizeRequests()
                // URLs matching for access rights
                .antMatchers("/").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/register").permitAll()
                .antMatchers("/register-applicant").permitAll()
                .antMatchers("/check-email").permitAll()
                .antMatchers("/check-username").permitAll()
                .antMatchers("/forget-password").permitAll()
                .antMatchers("/user-avatars/**").permitAll()
                .antMatchers("/verify").permitAll()
                /**Securing Pages for Specific Users**/
                .antMatchers("/user-profile").hasAnyAuthority("APPLICANT", "SUPERADMIN", "ADMIN")
                .antMatchers("/user-level").hasAnyAuthority("APPLICANT", "SUPERADMIN", "ADMIN")
                .antMatchers("/new-user-level").hasAnyAuthority("APPLICANT", "SUPERADMIN", "ADMIN")
                .antMatchers("/applications/**").hasAnyAuthority("APPLICANT", "SUPERADMIN", "ADMIN")
                .antMatchers("/get-games").hasAnyAuthority("APPLICANT", "ADMIN")
                .antMatchers("/get-game-roles").hasAnyAuthority("APPLICANT", "ADMIN")
                .antMatchers("/add-application").hasAnyAuthority("APPLICANT", "ADMIN")
                .antMatchers("/get-applications").hasAnyAuthority("APPLICANT", "ADMIN")
                .antMatchers("/update-profile").hasAnyAuthority("APPLICANT", "SUPERADMIN", "ADMIN")
                .antMatchers("search-permit-application").hasAnyAuthority("APPLICANT", "ADMIN")
                .antMatchers("/medical/delete-laboratory").hasAnyAuthority("SUPERADMIN", "ADMIN")
                .antMatchers("/medical/*").hasAnyAuthority("SUPERADMIN", "ADMIN")
                .antMatchers("/new-medical-facilities").hasAnyAuthority("SUPERADMIN", "ADMIN")
                .antMatchers("/medical-facilities").hasAnyAuthority("SUPERADMIN", "ADMIN")
                .antMatchers("/web-user").hasAnyAuthority("SUPERADMIN")
                .antMatchers("/get-payment-details/**").hasAnyAuthority("APPLICANT", "ADMIN")
                .antMatchers("/walk-in/**").hasAnyAuthority("ADMIN","SUPERADMIN")
                .anyRequest().authenticated()
                .and()
                // form login
                .csrf().disable().formLogin()
                .loginPage("/login")
                .failureUrl("/login?error=true")
                .defaultSuccessUrl("/")
                .usernameParameter("USERNAME")
                .passwordParameter("PASSWORD")
                .and()
                // logout
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login").and()
                .exceptionHandling()
                .accessDeniedPage("/access-denied");

        http.sessionManagement().maximumSessions(1);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/resources/**", "/static/**", "/assets/**", "/css/**", "/js/**", "/img/**",
                "/scss/**", "/assets-for-demo/**", "/favicon.ico", "/error", "/user-avatars/**","/verify");
    }
}
