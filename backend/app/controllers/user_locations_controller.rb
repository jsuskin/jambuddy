class UserLocationsController < ApplicationController
  def index
    @user_locations = UserLocation.all
    render json: @user_locations
  end

  def create
    user_location = UserLocation.create(user_location_params)
    if user_location.valid?
      render json: user_location
    else
      render json: { errors: user_location.errors.full_messages }, status: 422 #unprocessable_entity
    end
  end

  private

  def user_location_params
    params.permit(:latitude, :longitude, :user_id)
  end
end
