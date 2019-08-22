Rails.application.routes.draw do
  resources :jam_locations
  resources :jam_requests
  resources :messages
  resources :user_availabilities
  resources :user_locations
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
