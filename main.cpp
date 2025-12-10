#include <iostream>
#include <string>
#include<vector>

using namespace std;

struct corners{
    float a,b,c,d;
};


ostream& operator<<(ostream& stream,const corners& corners){
    stream << corners.a<<""<<corners.b<<""<<corners.c<<""<<corners.d<<endl;
}


int main(){

    vector<int> inty;
    inty.push_back(2);
    inty.push_back(3);

    for (auto i=inty.begin();i!=inty.end();++i){
        cout<< *i<<endl;
    }

    for (auto i=inty.begin();i!=inty.end();++i){
        cout<< *i<<endl;
    }

    vector <corners> corners;

    corners.push_back({1,2,3,4});
    corners.push_back({5,6,7,8});

    for (int i=0;i< corners.size();++i){
        cout<<corners[i]<<endl;     
    }


}

