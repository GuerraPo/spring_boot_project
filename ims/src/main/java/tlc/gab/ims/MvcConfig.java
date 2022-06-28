package tlc.gab.ims;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path avatarDir = Paths.get("./user-avatars");
        String avatarDirpath = avatarDir.toFile().getAbsolutePath();

        Path requirementsDir = Paths.get("./requirements/");
        String requirementsDirPath = requirementsDir.toFile().getAbsolutePath();

        //for windows
        //registry.addResourceHandler("/user-avatars/**").addResourceLocations("file:/"+avatarDirpath+"/");
        //registry.addResourceHandler("/requirements/**").addResourceLocations("file:/"+requirementsDirPath+"/");

        //for server (linux, centos, etc.)
        registry.addResourceHandler("/user-avatars/**").addResourceLocations("file://"+avatarDirpath+"/");
        registry.addResourceHandler("/requirements/**").addResourceLocations("file://"+requirementsDirPath+"/");
    }
}
