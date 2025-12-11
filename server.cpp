#include <iostream>
#include <stdlib.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include<cstring>


int main(int argc,char **argv){
    // int port =atoi(argv[1]);
    if (argc<2){
        std::cout<<"usage: "<<argv[0]<<" <portnumber>"<<std::endl;
    }

    
    int port=atoi(argv[1]);

    // 1 socket
    int sock=socket(AF_INET,SOCK_STREAM,0);

    //2 bind
    struct sockaddr_in address;
    memset(&address,0,sizeof(address));
    address.sin_family=AF_INET;
    address.sin_port=htons(port);

    int bind_value=bind(sock,(struct sockaddr *)&address,sizeof(address));
    if (bind_value<0){
        perror("could not bind");
        return 1;
    }


    // 3 listen

    int listen_value=listen(sock,1);
    if (listen_value<0){
        perror("could not listen");
        return 1;
    }

    // 4 accept

    struct sockaddr_in remote_address;
    memset(&address,0,sizeof(address));
    socklen_t remote_addrlen=sizeof(address);

    puts("waiting for new connection\n");

    int client_socket=accept(sock,(struct sockaddr *)&remote_address,&remote_addrlen);

    std::string client_ip=inet_ntoa(remote_address.sin_addr);

    int remote_port =ntohs(remote_address.sin_port);

    std::cout <<"accept new clint @"<<client_ip <<";"<<remote_port <<std::endl;

    int BUFFLEN=1024;
    char buffer[BUFFLEN];

    while (1)
    {
        memset(buffer,0,BUFFLEN);
        // 5 recive 
        int bytes_recived=recv(client_socket,buffer,BUFFLEN-1,0);

        if (bytes_recived <0)
        {
            perror("could not recive");
            return 1;
        }else if (bytes_recived ==0)
        {
            std::cout<<"clint at" <<client_ip << ";" << remote_port << "has disconnected." <<std::endl;
            break;
        }

        if (buffer[bytes_recived-1]=='\n')
        {
            buffer[bytes_recived-1]=0;
        }
        

        std::cout << "client message: \"" << buffer << "\"" << std::endl;
        
        // 6 send

        std::string response ="hello client at " +client_ip+":"+std::to_string(remote_port)+ 
            ". your message was \n\""+std::string(buffer) +"\"\n";
        
        int bytes_sent=send(client_socket,response.c_str(),response.length(),0);
        if (bytes_sent<0)
        {
            perror("could not send");
            return 1;
        }
        

    }
    

    std::cout <<"shutting down socket."<<std::endl;
    shutdown(client_socket,SHUT_RDWR);

}

