ENV['RAILS_ENV'] = "production" # Set to your desired Rails environment name
require File.expand_path('../config/environment', File.dirname(__FILE__))

if (new Date().getDay() === 1){
  Account.accrue_interest
}