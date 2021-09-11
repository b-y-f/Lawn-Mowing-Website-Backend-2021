# Progress Report

**Project name**: Lawn mowing website

**Date time**: 13/07/2021 – 19/10/2021

# Weekly plan
## Week 1
**Date time**       : 12/07/2021 – 18/07/2021

**Main propose**: Select and learn technology stack (1/2)

**Plan tasks**: 

- [x] Research about React
- [x] Review JavaScript
- [x] Component state, handlers
- [x] Debugging
- [x] Database in mongoDB


## Week 2
**Date time**     :   19/07/2021 – 25/07/2021

**Main propose**: Select and learn technology stack (2/2)

**Plan tasks**: 

- [x] API and RESTful API concept and how to implement it
- [x] Choice where to deploy the website
- [x] Review Node.js and Express

## Week 3
 **Date time**       : 26/07/2021 – 01/08/2021

 **Main propose**: Research about Lawn mowing website

 **Plan tasks**      : 

- [x] Browse NewZealand Mowing service website and find some interesting idea
- [x] What is the main function for **lawn mowing** service?
  - [x] Invoice
  - [x] Booking
  - [x] Quote
  - [x] Testimonials, like "Very good" ---Bill,Auckland
- [x] Other service except Lawn mowing?
  - [x] Gardening
    - [x] Garden & landscaping
    - [x] Hedge Trimming and Pruning
  - [x] Proterty Maintenance Services
    - [x] Rubish removal
    - [x] Gutter cleaning
- [x] Backend functions
  - [x] Manage invoice for clients
  - [x] Discount Offer (xmas, deal) for service
  - [x] Service content edit


## Week 4
 **Date time**       : 02/08/2021 - 08/08/2021

 **Main propose**    : Initial website

 **Plan tasks**      : 

- [x] Structure set
- [x] Decoupled approach



### Website Section
**Our articles(blog)**

Manager can upload new articles relate to lawn mowing which can be used to improve SEO and help clients.

```
New article
{
  date: 2009/2/2,
  author: xxx,
  title: xxx,
  content: xxx
}
```
**Services**
- Lawn mowing
- Gardening
- Remove garbage
- Hedge triming
- Become Franchise>>>Enquiry>>>after communicate>>>join team
- Booking >>> Quote

**Booking(CORE of this website)**
- Booking get quote as a guess or
- Become member and have a look of their book/service history



```
Quote  
{
  quote_date: 09-23-2000,
  client: {
    client_id: "23" // guest user id as guest
    client_name: 'fist nma'
    client_address: '123 abc st',
    client_phone: 111,
    client_email: '333@.com',
  },
  service_items: [
    { 
      item:lawn_mowing, 
      unit:2.5,
      what_unit: 'hours',
      price_per_unit : 90, // depends
      urgent: True,
      others: some extra money charged because ...
    },
    {
      item:remove_garbage, 
      unit:5.5,
      what_unit: 'kg',
      price_per_unit : 34, // depends
      urgent: False,
      others: some extra money charged because ...,
    },
    ...

    ],
}
```

Invoice could similar to quote but more specific

```
{
  //...
  invoice_id: 123312,
  Invoice_date: 08-01-2020,
  service provider: ['Alice','Mick'],
  extra_note: 'blah',
  discount: 15%,
  //...
}
```



### API Design

| Resource          | POST                          | GET                       | PUT                | DELETE          |
| ----------------- | ----------------------------- | ------------------------- | ------------------ | --------------- |
| /api/services     | create new service page       | Retrieve all services     | Update all         | NO              |
| /api/services/:id | Deny                          | Retrieve id service       | Update id          | delete id       |
| /api/clients      |
| /api/clients/:id  |
| /api/info         | Err                           | general info about        | Err                | Err             |
| /api/blogs        |
| /api/blogs/:id    | Err                           | get single blog           | update single blog | del single blog |
| /api/reviews      | Create new client Testimonial | Retrieve all              | Err                | Err             |
| /api/reviews/:id  | Err                           | get single                | update single      | del single      |
| /api/team         | add new team member           | retrieve all team members | Err                | Err             |
| /api/booking      | New booking                   | all hisotry of booking    | Err                | Err             |


## Week 5
 **Date time**       : 09/08/2021 - 08/15/2021

 **Main propose**    : Build back-end APIs

 **Plan tasks**      : 

 - [x] create user and guest quoting apis
 - [x] guest can get quote without login
 - [x] registered user also get login
 - [x] refactored backend code
 - [x] added middleware logger and error handlers
 - [x] user administration with JWT token


## Week 6
 **Date time**       : 16/08/2021 - 22/08/2021

 **Main propose**    : Build Font-end for show the service and work, then click quote to the quote page

 **Plan tasks**      : 

 - [x] create font-end page 
 - [x] page is low cost for business and best for SEO
 - [x] used next.js framework to build static site could be put in CDN
 - [x] remove unnecessary APIs
 - [x] learnt tailwind CSS and add some styles, work on mobile
 - [x] made page content markdown editable


 ## Week 7

  **Date time**       : 23/08/2021 - 29/08/2021

 **Main propose**    : Quote page with guest and client can add quote and check the history of their quotes, also can cancel it.

 **Plan tasks**      :

 - [x] Due to some bug appeared when I try to modify some of backend apis and better debug, I decide start to implement test driven development!!
 - [x] Add redux library to make state easier to manage
 - [ ] Make use of material UI to make quote app nicer
 - [ ] Google Api for address finding
 - [ ] user can edit bookings 1.edit 2. delete
 - [ ] add some states for booking

  **Some notes** :
 - Never create new function if old one not work solid
 - One by one: api then frontend, make change api and frontend at the same time could make things mass
 - Always testing APIs to make sure everything work as desired, otherwise you will get distracted by many other ideas
 - Start from simple
 - When develop with React, always think _state_ and _database_, data come generated by user will send to database at the same time rendered on virtualDOM. 
 - Never make useEffect uses side effect resursively... 


 ## Week 8

  **Date time**       : 13/09/2021 - 19/09/2021

 **Main propose**    : add manager access and admin can modify booking and quotes

 **Plan tasks**      :

 - [x] Used form-hook which could improve performance and feasibility to handle form in react
 - [x] add and test backend admin apis "/api/admin"
 - [ ] 


  **Some notes** :
 - faf





# Lawn mowing service website

## About

Just simple full-stack website which can be used to support small lawn mowing business, business owner can modify the content of this website with markdown, customer can get quote for those services. Registered user can view their booking histories, booking online and change booking to urgent.

## Requirements overview

There are three kind of user for this website, guest, client, manager. I will introduce each below.

### Guest

They can open the website and browse all the services and make a quote, after they got a quote, they can contact the consultant and make an appointment, then they have potential to become a Client.

### Client

They are registered user, they can add booking cancel it, and change the booking importance to urgent, also have a view of their past bookings.

### Manager

A manager can send quote and invoice to users. Approve, decline bookings with some message for reason. They also can change content of front-end website, for example, add new service and articles related to lawn mowing for improve SEO.  

## Software environment

Nodejs : v16.7.0

System: Unix

### Website development

|Front-end frame |  Back-end frame| Package manager| Databse
|--- | --- | --- | ---
 |NEXT.js | express.js| npm|MongoDB
 |React.js| |


### Website deployment

Static site: Vercel

Web app: Heroku

