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
- Hedge trimming
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
 - [x] Make use of material UI to make quote app nicer
 - [x] Google Api for address finding
 - [x] user can edit bookings 1.edit 2. delete
 - [x] add some states for booking

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
 - [x] change AWS api getway from REST to HTTP API to save faster speed and save money
 - [x] Add another serverless function submit quote to mongoDB(in the end migrate all quote Api to serverless)
 - [x] Add a little bit style to booking item and quote item 
 - [x] Add some validation for all website form 

  **Some notes** :
 - I think for small business, serverless is the future, it is pointless to run server 7*24 for only 500 visit per day
 
 - So I am attempting to learn some concepts about microservices and serverless which could help me better adapt to contemporary devlopment environment.
  
 - __CORs__ is a new problem I encountered in this project when deploy local server to vercel's server, in future, this need be configured to make sure the project is access by some pointed domain for security solving issues.

 - Next week, I want to do some research about lastest Google's "firebase" Api to improve the security and better manage user credentials.


**Current Serverless APIs**

http api :

https://kv3kfkgvmj.execute-api.us-east-2.amazonaws.com/post-contact

restful:


  POST - https://j1ktcuphqg.execute-api.us-east-2.amazonaws.com/dev/quotes

  GET - https://j1ktcuphqg.execute-api.us-east-2.amazonaws.com/dev/quotes/{id}

  GET - https://j1ktcuphqg.execute-api.us-east-2.amazonaws.com/dev/quotes

  PUT - https://j1ktcuphqg.execute-api.us-east-2.amazonaws.com/dev/quotes/{id}
  
  DELETE - https://j1ktcuphqg.execute-api.us-east-2.amazonaws.com/dev/quotes/{id}


## Week 9

  **Date time**       : 20/09/2021 - 26/09/2021

 **Main propose**    : Modify UI for user login and add firebase 

 **Plan tasks**      :

- [x] Make the client log in with Firebase and display useful content. UI design a mobile / desktop friendly UI; because it is for clients to use, it should be simple and include all necessary booking elements.
- [x] change the backend API to use the firebase feature 
- [x] Increase the number of service options.
- [x] To manage the render of the user booking page, use redux.
- [x] Client bookings should have statuses such as "pending," "approved," "declined," and so on. Because the company's location is too far away for some of the bookings. That booking could be declined by the booking manager.
- [x] After the booking is completed, the worker's name will appear on the client's booking card.

  **Some notes** :
- On September 16, 2021, material released their MUI core v5.00; I was using 4.0 at the time, so I updated to 5.0 this week to explore their new features.
- After reading an article about minimum usable views, I decided to redesign the client booking layout to focus solely on functionalities.
- This week, I learned how to use the useContext hook to pass user information across the entire application to make auth easier to modify. Previously, I used the localStage function in JS, but with the useContext hook, managing all the user information is much easier.
- The API for post and get all is now /api/client/ without any user id, thanks to Google Firebase, which has improved server-side authentication.
- I want add one more feature: manager dashboard, but no more time remain. So better make it simple.

## Week 10

**Date time**       : 27/09/2021 - 03/10/2021

**Main propose**    : Finish user booking state part and start admin layout 

**Plan tasks**      :

- [x] put all booking state to redux store
- [x] add notification UI and give notification global message with the help of redux
- [x] finish filter,sort, search functions
- [x] start building management dashboard
- [x] plan to build an admin dashboard for data visualization and quote management
- [x] add rating for booking database


**Some notes about redux** :

Redux is a library that could be used to replace `useState` which manage state globally by just adding some code in index and create a store.js to distribute the states.

To get redux work or control state, we need assign `ACTION` to it. An `ACTION` normally have a name that is some description of that action we would call later and a payload which carry the additional data we would modified. We also need a reducer to listening the `ACTION` and make change of state based on the `ACTION`. Normally like this: `function name(state, action){switch...}` 

Then we can use `useDispatch()` hook to give reducer an `ACTION` to update the state, then if we want to use the state we use `useSelector()` to call that state's values.

**Some notes about controlled components** :

I was encountered with uncontrolled component problem when I was code for reset after add Booking to booking list, every time when I reset booking form it will have error in console, but everything works fine, after spend whole night debugging, I finally found that I should ensure the `checked` attribute of CheckBox is not undefined. 

React handle element different with traditional DOM, in react everything mutable should be stored in state properties, this is so called controlled. But user still can use `ref` to add value to a uncontrolled element.  

**Plan for next week** :

After the those long term learning and building website, I found the easiest and fastest way is to build a website with some framework then provide some API to them and make those template render some data like visualization. So in next week I am going to build other JAMStack admin site to visualize and control the data with serverless API. I think that would be easy and fast finish of this project.



## Week 11

**Date time**       : 04/10/2021 - 10/10/2021

**Main propose**    : Finish all the functions and related to backend management, test it

**Plan tasks**      :

- [x] Data visualization in admin dashboard
- [x] User quotes management 
- [x] User booking management
- [x] change the token verification from JWT to google firebase admin to better control the security, to save work of update .pem and set certification( google will update public key two week) 

**Note: Serverless(FaaS)**

This week I learned more about serverless framework, which is like aws cli, a third party serverless app designed for to enable user easy and fast to configured and deploy serverless function from local into cloud.

Under the help of offline plugin, the debug is not a problem. But there are some shortage in serverless I find when I was deploy it, when make more services I have to initial multiple serverless functions otherwise rename could be a problem. 

**Fast development with template**

During this week's development, I found go with a template also a good learn experience , since the template are build by some professionals in front-end area, they are using some advanced technologies, good/clean coding styles and they provide a developer friendly interface for developer like me to reuse and modify their code without much headache.     



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

| Front-end frame | Back-end frame | Package manager | Database |
| --------------- | -------------- | --------------- | -------- |
| NEXT.js         | express.js     | npm             | MongoDB  |
| React.js        | AWS Lambda     |                 | DynamoDB |


### Website deployment

Static site: Vercel

Web app: Heroku

