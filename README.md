# Code Challenge

<br />

### Requirements

To get started, you will need to install Node.js on your environment.

### Node

[Node](http://nodejs.org/) is really easy to install and now includes [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure to check if the installation was done correctly.

    $ node --version
    v14.15.1

    $ npm --version
    6.14.8

---

### Install

    $ git clone https://github.com/smritisrinivas/code_challenge.git
    $ cd code_challenge
    $ npm install

### Update sources

Some packages need to be updated hence run `npm install` 

---

### Preliminaries

- [Node.js](https://nodejs.org) has been used to implement a web server 
- The server object listens to http requests on port 8080
- Data has been stored in the JSON format as it caters to seamless data exchange over the web

<br />

Start the server as a first step by running the following command in your terminal 

    $ node main.js


- In the browser, you should now be able to see a welcome message as well as different route paths/endpoints
- You can simply make a request to any of your desired endpoints to see the response 

---

### First challenge

The first challenge has been accomplished under the following path 

    /tenant/greenglobe/store/bangalore/chargingstation/:chargingstation/status/:time

### Be aware 
 
- A single tenant (greenglobe) entity has been maintained 
- A single store (bangalore) entity has been maintained
- The above mentioned path contains the two parameters ':chargingstation' and ':time' so don't forget to pass a value
- The store consists of only 2 charging stations, and they can be reached by simply inserting a value 1 or 2 in place of the ':chargingstation' parameter in the path 
- In order to check the status (open/close) of the charging station, for the current day input your desired time in a 24 hour format only ex: 1200, 1700 in place of the ':time'       parameter in the path 
    
### Expected result

The response includes a Boolean value of either true when the store is open or false when the store is closed 

---

### Second challenge 

The second challenge has been accomplished under the following path 

    /tenant/greenglobe/store/bangalore/chargingstation/:chargingstation/nextevent/:time

### Be aware 
 
- A single tenant (greenglobe) entity has been maintained 
- A sigle store (bangalore) entity has been maintained
- The above mentioned path contains thetwo parameters ':chargingstation' and ':time' so don't forget to pass a value
- The store consists of only 2 charging stations, and they can be reached by simply inserting a value 1 or 2 in place of the :chargingstation parameter in the path 
- In order to check the next event (open/close) of any given charging station for the current day, input your desired time in a 24 hour format only ex: 1200, 1700 in place of the ':time' parameter in the path 
    
### Expected result

The response includes the next event as either opening/closing with a time stamp 







