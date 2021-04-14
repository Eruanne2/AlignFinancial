@transfers.each do |tf|
  json.set! tf.id do
    json.partial! '/api/transfers/transfer', transfer: tf
  end
end