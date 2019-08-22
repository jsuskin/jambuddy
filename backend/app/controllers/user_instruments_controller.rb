class UserInstrumentsController < ApplicationController
  def index
    @user_instruments = UserInstrument.all
    render json: @user_instruments
  end

  def show
    user_instrument = UserInstrument.find(params[:id])
    render json: user_instrument
  end

  def create
    user_instrument = UserInstrument.create(user_instrument_params)
    if user_instrument.valid?
      render json: user_instrument
    else
      render json: { errors: user_instrument.errors.full_messages }, status: 422 #unprocessable_entity
    end
  end

  private

  def user_instrument_params
    params.permit(:name, :years_playing, :user_id)
  end
end
