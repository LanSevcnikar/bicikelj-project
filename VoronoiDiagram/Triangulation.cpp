#include <iostream>
#include <algorithm>
#include <vector>
#include <stack>
#include <set>
#include <queue>
#include <map>
#include <fstream>
#include <math.h> 
#include <string>
 
using namespace std;
typedef long long LL;
typedef long double LD;
typedef vector<LL> vi;
 
#define inf 999999999999;
#define FOR(i,n,m) for(LL i = n; i < m; i++)
#define pb push_back
#define mp make_pair
#define fs first
#define sc second
#define sz(x) (x).size()
#define all(v) (v).begin(),(v).end()
template<typename T> void PV(T v) {
	for(const auto e : v) cout<<e<<" "; cout<<endl;
}

#define ERR 0.000000001

struct Station {
  float x, y;
  string name;
  Station(string name, float x, float y) : x(x), y(y), name(name) {}
};

struct Point {
  float x, y;
  int index;
  Station* station;
  Point(float x, float y, int index, Station* station) : station(station), x(x), y(y), index(index){}
  Point() {}

  //overwrite equals function
  bool operator==(const Point& p) const {
    return (abs(x - p.x) < ERR && abs(y - p.y) < ERR);
  }
};

struct Triangle {
  Point p1, p2, p3;
  Point center;
  float radius;

  Triangle(Point _p1, Point _p2, Point _p3){
    p1 = _p1;
    p2 = _p2;
    p3 = _p3;
    //find the point that is the center of the circle that is the circumcircle of the triangle
    float a = p1.x - p2.x;
    float b = p1.y - p2.y;
    float c = p1.x - p3.x;
    float d = p1.y - p3.y;
    float e = a * (p1.x + p2.x) + b * (p1.y + p2.y);
    float f = c * (p1.x + p3.x) + d * (p1.y + p3.y);
    float g = 2.0 * (a * (p3.y - p2.y) - b * (p3.x - p2.x));
    if (g == 0) {
      center.x = inf;
      center.y = inf;
      radius = inf;
    } else {
      center.x = - (d * e - b * f) / g;
      center.y = - (a * f - c * e) / g;
      radius = sqrt(pow(center.x - p1.x, 2) + pow(center.y - p1.y, 2));
    }


  }

};


vector<Station> stations;
vector<Point> points;
vector<Triangle> triangles;

float sign(Point p1, Point p2, Point p3) {
  return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

bool isPointInsideTriangle(Point p, Triangle t){
  Point p1 = t.p1;
  Point p2 = t.p2;
  Point p3 = t.p3;
  float d1, d2, d3;
  bool has_neg, has_pos;

  d1 = sign(p, p1, p2);
  d2 = sign(p, p2, p3);
  d3 = sign(p, p3, p1);

  has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
  has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

  return !(has_neg && has_pos);
}

bool isPointInsideTriangleCircle(Point p, Triangle t){
  return pow(p.x - t.center.x, 2) + pow(p.y - t.center.y, 2) < pow(t.radius,2);
}

bool isSameEdge(pair<Point, Point> e1, pair<Point, Point> e2){
  return     (e1.fs == e2.fs && e1.sc == e2.sc) 
          || (e1.fs == e2.sc && e1.sc == e2.fs);
}

void addPointToTriangles(Point p) {
  vector<Triangle> badTriangles;
  vector<pair<Point, Point> > polygon;

  for (int i = 0; i < triangles.size(); i++) {
    if (isPointInsideTriangleCircle(p, triangles[i])) {
      badTriangles.push_back(triangles[i]);
    }
  }

  //loop through all the bad triangles and find the edges that is not shared with any before
  for (int i = 0; i < badTriangles.size(); i++){
    Triangle badTriangle = badTriangles[i];
    
    pair<Point, Point> edge1 = mp(badTriangle.p1, badTriangle.p2);
    pair<Point, Point> edge2 = mp(badTriangle.p2, badTriangle.p3);
    pair<Point, Point> edge3 = mp(badTriangle.p3, badTriangle.p1);

    bool edge1Shared = false;
    bool edge2Shared = false;
    bool edge3Shared = false;

    //loop through all other bad triangles and check if the edges are shared
    for (int j = 0; j < badTriangles.size(); j++){
      if (i == j) continue;
      Triangle otherBadTriangle = badTriangles[j];

      pair<Point, Point> newEdge1 = mp(otherBadTriangle.p1, otherBadTriangle.p2);
      pair<Point, Point> newEdge2 = mp(otherBadTriangle.p2, otherBadTriangle.p3);
      pair<Point, Point> newEdge3 = mp(otherBadTriangle.p3, otherBadTriangle.p1);

      if (!edge1Shared && isSameEdge(edge1, newEdge1)) edge1Shared = true;
      if (!edge1Shared && isSameEdge(edge1, newEdge2)) edge1Shared = true;
      if (!edge1Shared && isSameEdge(edge1, newEdge3)) edge1Shared = true;

      if (!edge2Shared && isSameEdge(edge2, newEdge1)) edge2Shared = true;
      if (!edge2Shared && isSameEdge(edge2, newEdge2)) edge2Shared = true;
      if (!edge2Shared && isSameEdge(edge2, newEdge3)) edge2Shared = true;

      if (!edge3Shared && isSameEdge(edge3, newEdge1)) edge3Shared = true;
      if (!edge3Shared && isSameEdge(edge3, newEdge2)) edge3Shared = true;
      if (!edge3Shared && isSameEdge(edge3, newEdge3)) edge3Shared = true;
    }

    if (!edge1Shared) polygon.push_back(edge1);
    if (!edge2Shared) polygon.push_back(edge2);
    if (!edge3Shared) polygon.push_back(edge3);

    //remove badTriangle from triangles
    for (int j = 0; j < triangles.size(); j++){
      if (triangles[j].p1 == badTriangle.p1 
       && triangles[j].p2 == badTriangle.p2 
       && triangles[j].p3 == badTriangle.p3){
          triangles.erase(triangles.begin() + j);
          break;
      }
    }
  }
  
  //loop through edges of polygon and create new triangles with the last point being the added point
  for (int i = 0; i < polygon.size(); i++){
    Triangle newTriangle = Triangle(polygon[i].fs, polygon[i].sc, p);
    triangles.push_back(newTriangle);
  }
}

void fillInStations(){
  
  stations.push_back(Station("KAMNIK", 300, 500));
  stations.push_back(Station("VISNJA GORA", -200, 100));
  stations.push_back(Station("PODLIPA", -200, 900));

  stations.pb(Station("LIDL BEŽIGRAD", 63.7970, 506.8540));
  stations.pb(Station("ŠMARTINSKI PARK", 65.2060, 529.9110));
  stations.pb(Station("SAVSKO NASELJE 1-ŠMARTINSKA CESTA", 62.4750, 524.3210));
  stations.pb(Station("ČRNUČE", 102.4460, 530.2130));
  stations.pb(Station("VILHARJEVA CESTA", 60.0500, 513.0200));
  stations.pb(Station("MASARYKOVA DDC", 57.6300, 514.2640));
  stations.pb(Station("POGAČARJEV TRG-TRŽNICA", 51.0930, 507.1860));
  stations.pb(Station("CANKARJEVA UL.-NAMA", 52.4310, 503.2570));
  stations.pb(Station("ANTONOV TRG", 41.7530, 477.0160));
  stations.pb(Station("PRUŠNIKOVA", 90.6080, 471.6370));
  stations.pb(Station("TEHNOLOŠKI PARK", 48.4300, 461.0860));
  stations.pb(Station("KOSEŠKI BAJER", 68.4430, 470.9130));
  stations.pb(Station("TIVOLI", 59.5200, 498.2000));
  stations.pb(Station("TRŽNICA MOSTE", 55.8010, 534.1560));
  stations.pb(Station("GRUDNOVO NABREŽJE-KARLOVŠKA C.", 45.7480, 506.1960));
  stations.pb(Station("LIDL-LITIJSKA CESTA", 47.6890, 547.4160));
  stations.pb(Station("ŠPORTNI CENTER STOŽICE", 82.5900, 520.1600));
  stations.pb(Station("ŠPICA", 40.2130, 512.0440));
  stations.pb(Station("ROŠKA - STRELIŠKA", 45.0000, 518.4600));
  stations.pb(Station("BAVARSKI DVOR", 56.8200, 505.5100));
  stations.pb(Station("STARA CERKEV", 63.4200, 494.5880));
  stations.pb(Station("SITULA", 59.4330, 520.5100));
  stations.pb(Station("ILIRSKA ULICA", 53.1440, 513.4790));
  stations.pb(Station("LIDL - RUDNIK", 20.0120, 532.4790));
  stations.pb(Station("KOPALIŠČE KOLEZIJA", 42.8670, 495.2390));
  stations.pb(Station("POVŠETOVA - KAJUHOVA", 51.5120, 539.2720));
  stations.pb(Station("DUNAJSKA C.-PS MERCATOR", 74.1930, 511.1340));
  stations.pb(Station("CITYPARK", 68.8050, 546.2570));
  stations.pb(Station("KOPRSKA ULICA", 33.4080, 482.4680));
  stations.pb(Station("LIDL - VOJKOVA CESTA", 75.8900, 520.1100));
  stations.pb(Station("POLJANSKA-POTOČNIKOVA", 48.9820, 522.7090));
  stations.pb(Station("POVŠETOVA-GRABLOVIČEVA", 51.8630, 530.3490));
  stations.pb(Station("PARK NAVJE-ŽELEZNA CESTA", 63.6100, 513.1500));
  stations.pb(Station("ZALOG", 60.4300, 613.7970));
  stations.pb(Station("CESTA NA ROŽNIK", 53.2410, 486.2060));
  stations.pb(Station("HOFER-KAJUHOVA", 56.4050, 540.9010));
  stations.pb(Station("DUNAJSKA C.-PS PETROL", 65.1360, 509.1120));
  stations.pb(Station("STUDENEC", 54.6150, 576.0310));
  stations.pb(Station("PARKIRIŠČE NUK 2-FF", 46.3770, 501.2560));
  stations.pb(Station("BRATOVŠEVA PLOŠČAD", 89.2900, 513.7510));
  stations.pb(Station("KONGRESNI TRG-ŠUBIČEVA ULICA", 50.3880, 504.6230));
  stations.pb(Station("BS4-STOŽICE", 86.7610, 514.1510));
  stations.pb(Station("GERBIČEVA - ŠPORTNI PARK SVOBODA", 39.3840, 485.4580));
  stations.pb(Station("ŽIVALSKI VRT", 52.4540, 472.1490));
  stations.pb(Station("VOKA - SLOVENČEVA", 75.2070, 504.7340));
  stations.pb(Station("BTC CITY/DVORANA A", 65.2970, 543.9960));
  stations.pb(Station("TRNOVO", 37.8400, 500.0100));
  stations.pb(Station("P+R BARJE", 27.4900, 499.5800));
  stations.pb(Station("ROŽNA DOLINA-ŠKRABČEVA UL.", 51.4390, 492.7300));
  stations.pb(Station("KINO ŠIŠKA", 69.2800, 489.7100));
  stations.pb(Station("BRODARJEV TRG", 54.3980, 553.3190));
  stations.pb(Station("ZALOŠKA C.-GRABLOVIČEVA C.", 54.4100, 529.7800));
  stations.pb(Station("DOLENJSKA C. - STRELIŠČE", 38.8660, 517.6050));
  stations.pb(Station("ŠTEPANJSKO NASELJE 1-JAKČEVA ULICA", 53.0470, 545.1250));
  stations.pb(Station("SOSESKA NOVO BRDO", 45.6170, 462.2810));
  stations.pb(Station("TRŽNICA KOSEZE", 74.3150, 475.4830));
  stations.pb(Station("ALEJA - CELOVŠKA CESTA", 77.3020, 482.5810));
  stations.pb(Station("MERCATOR CENTER ŠIŠKA", 87.0790, 475.4390));
  stations.pb(Station("GH ŠENTPETER-NJEGOŠEVA C.", 52.5700, 519.2800));
  stations.pb(Station("HOFER - POLJE", 53.7180, 589.2840));
  stations.pb(Station("VIŠKO POLJE", 46.1890, 469.0370));
  stations.pb(Station("BONIFACIJA", 39.6410, 472.6640));
  stations.pb(Station("P + R DOLGI MOST", 37.0030, 465.2290));
  stations.pb(Station("DRAVLJE", 79.8400, 479.9520));
  stations.pb(Station("POLJE", 57.2200, 583.5370));
  stations.pb(Station("SUPERNOVA LJUBLJANA - RUDNIK", 21.5860, 536.7450));
  stations.pb(Station("SREDNJA FRIZERSKA ŠOLA", 80.5220, 491.4390));
  stations.pb(Station("TRG OF-KOLODVORSKA UL.", 57.4210, 510.2650));
  stations.pb(Station("TRG MDB", 47.5650, 495.6870));
  stations.pb(Station("TRŽAŠKA C.-ILIRIJA", 44.6290, 486.6990));
  stations.pb(Station("PREŠERNOV TRG-PETKOVŠKOVO NABREŽJE", 51.3670, 506.5420));
  stations.pb(Station("MERCATOR MARKET - CELOVŠKA C. 163", 73.2640, 485.9420));
  stations.pb(Station("SAVSKO NASELJE 2-LINHARTOVA CESTA", 64.5460, 518.0130));
  stations.pb(Station("BREG", 46.4980, 505.1480));
  stations.pb(Station("BTC CITY ATLANTIS", 63.0810, 547.8510));
  stations.pb(Station("IKEA", 65.1750, 539.5370));
  stations.pb(Station("MIKLOŠIČEV PARK", 54.1680, 507.0600));
  stations.pb(Station("BARJANSKA C.-CENTER STAREJŠIH TRNOVO", 40.8100, 499.5100));
  stations.pb(Station("LEK - VEROVŠKOVA", 76.8560, 500.2220));
  stations.pb(Station("AMBROŽEV TRG", 49.8770, 516.3080));
  stations.pb(Station("VOJKOVA - GASILSKA BRIGADA", 68.7270, 516.8580));
  stations.pb(Station("RAKOVNIK", 36.2840, 522.9480));
  stations.pb(Station("PREGLOV TRG", 54.5540, 559.0800));
  stations.pb(Station("PLEČNIKOV STADION", 69.4200, 510.5200));
}

bool areTrianglesNeigbours(Triangle a, Triangle b){
  



  
  return false;
}

int main(){
  fillInStations();
  int n = stations.size();
  // loop through stations and for each create a new point
  for(int i = 0; i < n; i++){
    float x = stations[i].x;
    float y = stations[i].y;
    Point p(x, y, i, &stations[i]);
    points.pb(p);
  }


  // add the main triangle to the triangulation
  triangles.pb(Triangle(points[0], points[1], points[2]));

  //loop through points after 3
  for(int j = 3; j < n; j++){
    addPointToTriangles(points[j]);
    // for(int i = 0; i < triangles.size(); i++){
    //   cout << ((abs(triangles[i].p1.y) < ERR) ? 0 : triangles[i].p1.x) << " " << ((abs(triangles[i].p1.y) < ERR) ? 0 : triangles[i].p1.y) << endl;
    //   cout << ((abs(triangles[i].p2.y) < ERR) ? 0 : triangles[i].p2.x) << " " << ((abs(triangles[i].p2.y) < ERR) ? 0 : triangles[i].p2.y) << endl;
    //   cout << ((abs(triangles[i].p3.y) < ERR) ? 0 : triangles[i].p3.x) << " " << ((abs(triangles[i].p3.y) < ERR) ? 0 : triangles[i].p3.y) << endl;
    //     cout << "---" << endl;
    // }
    // cout << "------------" << endl;
  }

  //loop through all triangles and if any coordiante of any point is too close to 0 (ERR),, set it to 0
  for(int i = 0; i < triangles.size(); i++){
    if(abs(triangles[i].p1.x) < ERR) triangles[i].p1.x = 0;
    if(abs(triangles[i].p1.y) < ERR) triangles[i].p1.y = 0;
    if(abs(triangles[i].p2.x) < ERR) triangles[i].p2.x = 0;
    if(abs(triangles[i].p2.y) < ERR) triangles[i].p2.y = 0;
    if(abs(triangles[i].p3.x) < ERR) triangles[i].p3.x = 0;
    if(abs(triangles[i].p3.y) < ERR) triangles[i].p3.y = 0;
  }

  // print out the triangles
  for(int i = 0; i < triangles.size(); i++){
    cout << ((abs(triangles[i].p1.y) < ERR) ? 0 : triangles[i].p1.x) << " " << ((abs(triangles[i].p1.y) < ERR) ? 0 : triangles[i].p1.y) << endl;
      cout << ((abs(triangles[i].p2.y) < ERR) ? 0 : triangles[i].p2.x) << " " << ((abs(triangles[i].p2.y) < ERR) ? 0 : triangles[i].p2.y) << endl;
      cout << ((abs(triangles[i].p3.y) < ERR) ? 0 : triangles[i].p3.x) << " " << ((abs(triangles[i].p3.y) < ERR) ? 0 : triangles[i].p3.y) << endl;
  }

  ofstream printToFile("triangles.txt");
  // print out all triangles to file in format p1.x,p1.y,p2.x,p2.y,p3.x,p3.y
  for(int i = 0; i < triangles.size(); i++){
    printToFile << ((abs(triangles[i].p1.y) < ERR) ? 0 : triangles[i].p1.x) << "," << ((abs(triangles[i].p1.y) < ERR) ? 0 : triangles[i].p1.y) << ",";
    printToFile << ((abs(triangles[i].p2.y) < ERR) ? 0 : triangles[i].p2.x) << "," << ((abs(triangles[i].p2.y) < ERR) ? 0 : triangles[i].p2.y) << ",";
    printToFile << ((abs(triangles[i].p3.y) < ERR) ? 0 : triangles[i].p3.x) << "," << ((abs(triangles[i].p3.y) < ERR) ? 0 : triangles[i].p3.y) << endl;
  }



  return 0;

}