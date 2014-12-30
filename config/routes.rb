Rails.application.routes.draw do

root 'songs#index'
resources :sessions, only: [ :new, :create, :destroy ]
resources :users, only: [ :new, :create, :update, :edit, :show ] do
  member do
    get :activate
  end
end
resources :songs do
  resources :comments, only: [ :create, :destroy ]
end
resource :likeship, only: [ :create, :destroy ]
resources :notifications, only: [ :index, :destroy ] do
  collection do
    post :count
    delete :clear
  end
end
resources :password_resets, only: [ :new, :create, :edit, :update]
get 'login', to: 'sessions#new', as: :login
get 'signup', to: 'users#new', as: :signup
delete 'logout', to: 'sessions#destroy', as: :logout
get 'collect', to: 'songs#collect', as: :collect
get 'user_songs', to: 'users#user_songs', as: :user_songs
get 'favorite_songs', to: 'users#favorite_songs', as: :favorite
get 'recent_comments', to: 'users#recent_comments', as: :recent_comments
get 'language', to: 'users#language', as: :set_locale
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
