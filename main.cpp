#include <iostream>
#include <string>
using namespace std;

class Phone{
    string _name="";
    string _os="";
    int _price=0;

public:
    Phone();//default constructor
    Phone(const string & name,const string & os,const int & price);//primary constructor
    Phone(const Phone &);//cpopy constructor
    string  getName(){return _os;}
    int getPrice();
    ~Phone();//destructor



};

int Phone::getPrice(){
    printf("value of get price is %p\n",this);
    return _price;

}


Phone::Phone() :_name(),_os("momm"),_price(){
    puts("default constructor");
}

Phone::Phone(const string & name,const string & os,const int & price): _name(name),_os(os), _price(price)
        {
            puts("this is a parameter constructor");

        }

Phone::Phone(const Phone & values){
    puts ("this is to over ride copy constructor");
    _name=values._name;
    _os="skinned-"+values._os;
    _price=values._price;

}

Phone::~Phone(){
    printf("destructor called for %s\n",_name.c_str());
}


int main(){

    Phone apple;
    cout<<apple.getName()<<endl;

    Phone oneplus("OP8","android",799);


    printf("value of object is %p\n",&oneplus);

    cout<<oneplus.getPrice()<<endl;

    Phone mi=oneplus;
    cout << mi.getName() <<endl;


    return 0;


}

