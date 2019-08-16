class UserAvailabilitiesController < ApplicationController
  def index
    @user_availabilities = UserAvailability.all
    render json: @user_availabilities
  end

  def create
    user_availability = UserAvailability.create(user_availability_params)
    if user_availability.valid?
      render json: user_availability
    else
      render json: { errors: user_availability.errors.full_messages }, status: 422 #unprocessable_entity
    end
  end

  private

  def user_availability_params
    params.permit(:day_of_week, :start_time, :end_time, :user_id)
  end
end
