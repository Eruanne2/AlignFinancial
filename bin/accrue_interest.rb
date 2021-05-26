ENV['RAILS_ENV'] = "production" # Set to your desired Rails environment name
require File.expand_path('../config/environment', File.dirname(__FILE__))

Account.accrue_interest