class JamLocationsController < ApplicationController
  def index
    @jam_locations = JamLocation.all
    render json: @jam_locations
  end

  def show
    jam_location = JamLocation.find(params[:id])
    render json: jam_location
  end

  def create
    jam_location = JamLocation.create(jam_location_params)
    if jam_location.valid?
      render json: jam_location
    else
      render json: { errors: jam_location.errors.full_messages }, status: 422 #unprocessable_entity
    end
  end

  private

  def jam_location_params
    params.permit(:street_number, :street_name, :city, :state, :zip_code, :jam_request_id)
  end
end
