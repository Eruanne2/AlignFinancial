task :accrue_interest => :environment do
  if (Date.today.strftime("%A") == "Monday")
    Account.accrue_interest
  end
end