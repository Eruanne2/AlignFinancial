task :mytask => :environment do
  if (new Date().getDay() === 1){
    Account.accrue_interest
  }
end