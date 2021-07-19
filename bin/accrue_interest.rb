ENV['RAILS_ENV'] = "production" # Set to your desired Rails environment name
require File.expand_path('../config/environment', File.dirname(__FILE__))
require 'date'


if (Date.today.strftime("%A") == "Monday"){
  Account.accrue_interest
}