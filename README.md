# Overview

[Align Bank](https://align-financial.herokuapp.com/#/), an [Ally Bank](https://www.ally.com/bank/) clone, is an online-only bank that offers interest checking, high-yield savings, and money market accounts. Because Align has no offices and all business is conducted online, their website is a clean interface designed around functionality and easy navigation.

<div align='center'>
 <a href='https://align-financial.herokuapp.com/#/' target='_blank'>
  <img src="https://github.com/Eruanne2/AlignFinancial/blob/main/app/assets/images/logo-on-white.png" width="200" alt="The 'Align' logo in purple letters">
  <br/>
  <img src="https://github.com/Eruanne2/AlignFinancial/blob/main/recording.gif" width="600" height="300" />
 </a>
</div>

# Table of Contents
* [Technologies](#technologies)
* [Features](#features)
  * [User Auth](#user-auth)
  * [Accounts](#accounts)
  * [Transfers](#transfers)
  * [Dashboard](#dashboard)
* [Features In Progress](#features-in-progress)
  * [Interactive Graph](#interactive-graph)
  * [Transaction Search](#transaction-search)
* [Lessons Learned](#lessons-learned)
  * [Database Design](#database-design)
  * [Component Design](#component-design)
  * [Methodology](#methodology) 

# Technologies
## Stack
* PostgreSQL
* Ruby on Rails
* Node.js
* React-Redux

# Features
## User Auth
## Accounts
## Transfers
## Interest Accrual

## Site Settings

gif here

I dedicated a slice of my Redux store's state to manage various ui elements. 

```
ui {
  sidebar: true,
  nightMode: false,
  accessibleView: false
}
```

The `sidebar` key manages the modal state 

The `night mode` feature adds a CSS class to the body which overrides background and font colors. The colors chosen are the brand shades of purple and blue scaled into a dark gray. 

The `accessible view` feature adds a CSS class to the body which sets the font size to be larger and more darkly colored site-wide. This improves readability both for dyslexic and visually impaired users. 
``` 
  font-size: calc(15px * 1.2);
  color: #000;
```
In addition, the accessible view adds a bright yellow background for all elements under `:focus`. This is to add increased accessibility both for visually impaired users and for users who do not use a mouse. 

# Features Coming Soon
## Transaction Search
I would like to have a search icon above each transactions index. When the user clicks the icon, a search bar would slide out to the left and allow them to type. Keywords will be checked against all fields (the to account, the from account, the amount, the date, and the memo). The index would filter to show only matching transactions. 

# Lessons Learned
## Database Design
One lesson I learned is to not try to accomplish too many different things with one table. One of the first decisions that I had to make was on 
## Front-end Design
Mostly, I learned that React classes suck and Hooks is the way to go. I wrote this entire project using classes, and deeply regretted it! Managing state was a headache, ComponentDidMount was a pain, and conditional rendering/updating was far more complicated than in other projects where I have used only Hooks. 
