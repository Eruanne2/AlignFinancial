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
* [Notable Features](#noteable-features)
  * [User Auth](#user-auth)
  * [Transfers](#transfers)
  * [Interest Accrual](#interest-accrual)
  * [Site Settings](#site-settings)
* [Features Coming Soon](#features-coming-soon)
  * [Transaction Search](#transaction-search)
* [Lessons Learned](#lessons-learned)
  * [Database Design](#database-design)
  * [Component Design](#component-design)

# Technologies
## Stack
* PostgreSQL
* Ruby on Rails
* Node.js
* React-Redux

# Notable Features
## User Auth



## Transfers

<div align="center">
  <img src="https://github.com/Eruanne2/AlignFinancial/blob/main/recording.gif" width="600" height="300" />
</div>

Users can make transfers between two of their accounts. These transfers are carefully vetted in the `TransfersController` to verify proper account ownership, balance availability, and transfer limit allowance for non-checking accounts. 

## Interest Accrual
Interest accrual is simulated using Heroku's task scheduler, which runs Account.accrue_interest every night at 12:00 UTC.

```
  def self.accrue_interest
    
    interest_acct = Account.find_by({nickname: "Master Interest"})
    Account.all.each do |acct| 
      unless acct.id == interest_acct.id || acct.external
        transfer = Transfer.new({ 
          from_acct_id: interest_acct.id,
          to_acct_id: acct.id,
          amount: (acct.balance * acct.interest_rate / 36500),
          memo: 'Daily Interest Accrual',
          user_id: acct.user_id
        })
        if transfer.save
          new_balance = acct.balance + (acct.balance * acct.interest_rate / 36500)
          new_ytd = acct.interest_ytd + (acct.balance * acct.interest_rate / 36500)
          acct.update_attributes({balance: new_balance, interest_ytd: new_ytd })
        end
      end
    end

  end
```

This creates a new Transfer record from the Master Interest account (which belongs to the MasterUser, a user account inaccessible to public users) into each internal account. Interest accrues daily, so the amount deposited is calculated using the account type's annual rate divided by 365. 

## Site Settings

<div align="center">
  <img src="https://github.com/Eruanne2/AlignFinancial/blob/main/recording.gif" width="600" height="300" />
</div>

Since many different components interact with the ui features, I needed global access to check whether or not they are active. So I dedicated a slice of my Redux store's state to manage the various ui states.

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
One lesson I learned is to not try to accomplish too many different things with one table. One of the first decisions that I had to make was whether to create two separate tables for internal and external accounts. I chose to make use one table since they are both "accounts", after all. However, considering that internal and external account behave differently, have different properties, and are used for different things, this proved to be far more complex and messy than having two separate tables would have.

## Front-end Design
Mostly, I learned that React classes suck and Hooks is the way to go. I wrote this entire project using classes, and deeply regretted it! Managing state was a headache, ComponentDidMount was a pain, and conditional rendering/updating was far more complicated than in other projects where I have used only Hooks. 
