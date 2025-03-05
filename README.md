Code to install everything:

Database:
After the installation of Docker:
docker pull phpmyadmin/phpmyadmin
docker run --name=mariadb123 -e MYSQL_ROOT_PASSWORD=(PWD) -e MYSQL_DATABASE=mydp -p 3306:3306 -d mariadb
docker run --name phpMyAdmin -d --link mariadb123:db -p 8080:80 phpmyadmin/phpmyadmin

//where (PWD) is the password for the database

Packages:
npm install -g @angular/cli //Install angular
ng add @angular/material //angular materaial package //design
npm install leaflet
npm i --save-dev @types/leaflet   //install leaflet //maps
