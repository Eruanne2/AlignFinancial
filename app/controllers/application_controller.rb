class ApplicationController < ActionController::Base
  helper_method :logged_in?, :current_user, :last_login_time
  before_action :underscore_params!
  
  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def last_login_time
    session[:last_login] || DateTime.now.to_s
  end
  
  def require_logged_in
    unless logged_in?
      render json: { message: "You must be logged in to complete this action." }, status: 401
    end
  end
  
  def logged_in?
    !!current_user
  end
  
  def login!(user)
    session[:session_token] = user.reset_session_token!
    session[:current_login] = DateTime.now.to_s
  end
  
  def logout
    current_user.reset_session_token!
    session[:session_token] = nil
    session[:last_login] = session[:current_login]
    @current_user = nil
  end
  
  def underscore_params!
    underscore_hash = -> (hash) do
      hash.transform_keys!(&:underscore)
      hash.each do |key, value|
        if value.is_a?(ActionController::Parameters)
          underscore_hash.call(value)
        elsif value.is_a?(Array)
          value.each do |item|
            next unless item.is_a?(ActionController::Parameters)
            underscore_hash.call(item)
          end
        end
      end
    end
    underscore_hash.call(params)
  end
  
end
