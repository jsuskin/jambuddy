class JamRequestsController < ApplicationController
  def index
    @jam_requests = JamRequest.all
    render json: @jam_requests, include: :jam_location
  end

  def create
    jam_request = JamRequest.create(jam_request_params)
    if jam_request.valid?
      render json: jam_request
    else
      render json: { errors: user_availability.errors.full_messages }, status: 422 #unprocessable_entity
    end
  end

  def show
    jam_request = JamRequest.find(params[:id])
    render json: jam_request, include: :jam_location
  end

  def update
    @jam_request = JamRequest.find(params[:id])
    @jam_request.update(jam_request_params)
    if @jam_request.save
      render json: @jam_request
    else
      render json: { errors: user_availability.errors.full_messages }, status: 422
    end
  end

  private

  def jam_request_params
    params.permit(:weekday, :month, :day, :year, :start_time, :end_time, :sender_id, :receiver_id, :status)
  end
end
