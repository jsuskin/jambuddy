class UsersController < ApplicationController
  def index
    users = User.all
    render json: users, include: [{user_location: {only: [:latitude, :longitude]}}, {user_availabilities: {only: [:day_of_week, :start_time, :end_time, :id]}}]
  end

  def create
    user = User.create(user_params)
    if user.valid?
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: 422 #unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :password, :image)
  end
end
