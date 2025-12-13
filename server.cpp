#include <iostream>
#include <sys/socket.h>
#include <netinet/in.h>
#include <cstring>
#include <arpa/inet.h>

int main(){

    const char *socket_port="9999";

    int port=atoi(socket_port);

    int sockket=socket(AF_INET,SOCK_STREAM,0);

    if (sockket==-1)
    {
        std::cerr<<"error socket creation failed "<<std::endl;
        return 1;
    }
    
    struct sockaddr_in address;
    memset(&address,0,sizeof(address));
    address.sin_family=AF_INET;
    address.sin_port=htons(port);

    int bind_value=bind(sockket,(struct sockaddr *)&address,sizeof(address));
    if (bind_value <0){
        perror("could not bind ");
        return 1;
    }

    int listen_value=listen(sockket,1);
    if (listen_value<0){
        perror("error in listening");
        return 1;

    }

    struct sockaddr_in remote_address;
    memset(&remote_address,0,sizeof(remote_address));
    socklen_t remote_addresslen=sizeof(remote_address);

    puts("waiting for new connection\n");

    int client_socket=accept(sockket,(struct sockaddr *)&remote_address,&remote_addresslen);
    
    std::string client_ip=inet_ntoa(remote_address.sin_addr);

    int remote_port=ntohs(remote_address.sin_port);

    int BUFFLEN=1024;
    char buffer[BUFFLEN];\

    while (true)
    {
        memset(buffer,0,BUFFLEN);

        int bytes_recived=recv(client_socket,buffer,BUFFLEN-1,0);
        if (bytes_recived<0)
        {
           
            perror("could not recive");
            return 1;
        }else if (bytes_recived==0)
        {
            std::cout<<"client at"<<client_ip <<";" <<remote_port<<"has connected ."<< std::endl;
            break;
        }
        if (buffer[BUFFLEN-1]=='\n')
        {
            buffer[BUFFLEN-1]=0;
        }
        
        std::cout <<"client message: \" " <<buffer << "\"" <<std::endl;

    }
    
    std::cout<<"shutting down"<<std::endl;
    shutdown(client_socket,SHUT_RDWR);

}
