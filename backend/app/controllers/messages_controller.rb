class MessagesController < ApplicationController
  def index
    @messages = Message.all
    render json: @messages
  end

  def create
    message = Message.create(message_params)
    if message.valid?
      render json: message
    else
      render json: { errors: user_availability.errors.full_messages }, status: 422 #unprocessable_entity
    end
  end

  private

  def message_params
    params.permit(:subject, :body, :sender_id, :receiver_id)
  end
end
