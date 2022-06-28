#
# Build stage
#
FROM maven:3.6.0-jdk-11-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

#
# Package stage
#
FROM openjdk:8-jdk-alpine
COPY --from=build /home/app/target/ims-0.0.1-SNAPSHOT.jar /usr/local/lib/ims.jar
EXPOSE 3279
ENTRYPOINT ["java","-jar","/usr/local/lib/ims.jar"]

#To build an image:
#run "sudo docker image build -t gab-portal ."
#**Note: Replace the <image_name> w/ your desired image name
#
#To see the list of images:
#run "sudo docker image ls"
#
#To run a container based on an image:
#run "sudo docker run -d -p 3279:3279 gab-portal"
#**Note: Replace the <image_name> w/ your desired image name
#
#To display the list of containers:
#run "sudo docker container ps -a"
#
#To remove a container/undeploying
#run sudo docker rm -f <container_id>
#
#To check docker directories
#sudo docker exec -it <container_id> ls <directory>
