class JamRequestsController < ApplicationController
  def index
    @jam_requests = JamRequest.all
    render json: @jam_requests
  end

  def create
    jam_request = JamRequest.create(jam_request_params)
    if jam_request.valid?
      render json: jam_request
    else
      render json: { errors: user_availability.errors.full_messages }, status: 422 #unprocessable_entity
    end
  end

  private

  def jam_request_params
    params.permit(:weekday, :month, :day, :year, :start_time, :end_time, :sender_id, :receiver_id, :accepted)
  end
end
