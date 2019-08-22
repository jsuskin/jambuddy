class ExternalLinksController < ApplicationController
  def index
    @external_links = ExternalLink.all
    render json: @external_links
  end

  def show
    external_link = ExternalLink.find(params[:id])
    render json: external_link
  end

  def create
    external_link = ExternalLink.create(external_link_params)
    if external_link.valid?
      render json: external_link
    else
      render json: { errors: external_link.errors.full_messages }, status: 422 #unprocessable_entity
    end
  end

  private

  def external_link_params
    params.permit(:url, :user_id)
  end
end
