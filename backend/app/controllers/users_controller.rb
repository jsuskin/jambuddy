require 'json'

class UsersController < ApplicationController
  def index
    users = User.all
    render json: users, include: [{user_location: {only: [:latitude, :longitude]}}, {user_availabilities: {only: [:day_of_week, :start_time, :end_time, :id]}}, {sent_messages: {only: [:subject, :body, :receiver_id]}}, {received_messages: {only: [:subject, :body, :sender_id]}}]
  end

  def show
    user = User.find(params[:id])
    render json: user, include: [{user_location: {only: [:latitude, :longitude]}}, {user_availabilities: {only: [:day_of_week, :start_time, :end_time, :id]}}, {sent_messages: {only: [:subject, :body, :receiver_id]}}, {received_messages: {only: [:subject, :body, :sender_id]}}]
  end

  def create
    user = User.create(user_params)
    if user.valid?
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: 422 #unprocessable_entity
    end
  end

  # def sent_messages
  #   @user = User.find(params[:id])
  #   @sent_messages = Message.select
  # end
  #
  # def received_messages
  #
  # end

  private

  def user_params
    params.permit(:username, :password, :image)
  end
end
