# Progress Report

**Project name**: Lawn mowing website

**Date time**: 13/07/2021 – 19/10/2021

# About 
Just simple fullstack website which can be used to support small lawn mowing bussiness

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
 **Date time**       : 16/08/2021 - 23/08/2021

 **Main propose**    : Build Font-end for login and get quote

 **Plan tasks**      : 

 - [x] create font-end page 
 - [x] page is low cost for business and best for SEO
 - [x] used next.js framework to build static site could be put in CDN
 - [x] remove unnecessary APIs
 - [x] learnt tailwind CSS and add some styles, work on mobile
 - [x] made page content markdown editable

 ## Week 7
 