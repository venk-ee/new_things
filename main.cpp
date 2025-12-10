#include <iostream>
#include <string>
// #include<vector>
#include <algorithm>

using namespace std;



int main(){

    int numbers[6]={3,2,6,5,7,8};

    cout<< "unsorted values: "<<endl;
    for(int n:numbers){
        cout<<n<<""<<endl;
    }


    sort(numbers,numbers+6);

    if (binary_search(numbers,numbers+6,7)){
        cout<<"number found"<<endl;
    }else{
        cout<<"number not found" <<endl;
    }


    cout<<"sorted value : "<<endl;
    for(int n:numbers){
        cout<<n<<" "<<endl;
    }

    return 0;
}