# Overview

[Align Bank](https://align-financial.herokuapp.com/#/), an [Ally Bank](https://www.ally.com/bank/) clone, is an online-only bank that offers interest checking, high-yield savings, and money market accounts. Because Align has no offices and all business is conducted online, their website is a clean interface designed around functionality and easy navigation.

<div align='center'>
 <a href='https://align-financial.herokuapp.com/#/' target='_blank'>
  <img src="https://github.com/Eruanne2/AlignFinancial/blob/main/app/assets/images/logo-on-white.png" width="200" alt="The 'Align' logo in purple letters">
  <br/>
  <img src="https://github.com/Eruanne2/AlignFinancial/blob/main/app/assets/gifs/login.gif" width="600" height="300" />
 </a>
</div>

# Table of Contents
* [Technologies](#technologies)
* [Notable Features](#noteable-features)
  * [User Authentication](#user-authentication)
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
## User Authentication

The auth pattern was implemented in the Ruby on Rails models and controllers. Explain how it works with the cookie and with saving the last login time
```
```

At runtime the current user is set onto the window so that React has access to the user object.
```
# app/views/layouts/application.html.erb

 <% if logged_in? %>
   <script type='text/javascript'>
     window.currentUser = <%= render('/api/users/user.json.jbuilder', user: current_user).html_safe %>
   </script>
 <% end %>
 
# frontend/entry.js
 if (window.currentUser){
   const preloadedState = { 
     entities: {
       users: { [window.currentUser.id]: window.currentUser }
     },
     session: { 
       id: window.currentUser.id, 
       lastLogin: new Date(window.lastLogin.replace(/-/g, '/').replace(' /', ' -')),
       currentLogin: new Date()
     }
   };
   store = configureStore(preloadedState);
 }
```

Due to the sensitive nature of financial information, the user will be automatically logged out after 5 minutes of inactivity.
```
```

If the user checks the "Save Username" box, their username will be saved to local storage, allowing them to sign in more easily.
```
 <label id='save-username-label'>
   <input type='checkbox' checked={this.state.savedUser} onChange={this.handleSaveUser.bind(this)} />Save Username
 </label>
 
 ...
 
  handleSaveUser(e){
   e.currentTarget.checked
     ? localStorage.setItem('savedUser', this.state.username)
     : localStorage.setItem('savedUser', '')
   this.setState({savedUser: !this.state.savedUser})
 }
```

If the user forgets their username, they will be prompted to enter the email address associated with their account. An email will then be sent to them using Simple Mail Transfer Protocol (SMTP). If the email address provided is associated with an account, the email will contain their username. If no account is found, the email will inform the user of this and direct them to visit the website and create an account. 

```
 sendEmail() {
    this.setState({loading: true})
    let user = Object.values(this.users).filter(user => user.email === this.userEmail )[0];
    let body = user ? 
      `Your username is ${user.username}.` 
      :
      '<h1>Forgot Username</h1> <p>Oops, looks like this email isn\'t associated with an Align Bank account. To create one, \
      check us out <a href="https://align-financial.herokuapp.com/#/">here</a>!</p>'
    let toEmail = this.state.userEmail;
    let that = this;

    Email.send({
      Host: "smtp.gmail.com",
      Username: "alignbank@gmail.com",
      To: toEmail,
      From: "alignbank@gmail.com",
      Subject: "Align Bank Forgotten Username Request",
      'MIME-Version': '1.0rn',
      'Content-Type': "text/html; charset=ISO-8859-1rn",
      Body: body
    })
      .then(function (message) {
        that.setState({loading: false})
        alert(`Username sent to ${toEmail}`)
      });
  }
```
At this time, there is no option for the user to reset a forgotten password. They will simply be redirected to a page which informs them that their account is lost and that I have seized all their assets. 


## Transfers

<div align="center">
  <img src="https://github.com/Eruanne2/AlignFinancial/blob/main/app/assets/gifs/transfers.gif" width="600" height="300" />
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
  <img src="https://github.com/Eruanne2/AlignFinancial/blob/main/app/assets/gifs/settings.gif" width="600" height="300" />
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
