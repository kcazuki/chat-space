class Api::MessagesController < ApplicationController
  def index
    @messages = Messages.where('id > ?', params[:group_id])
  end
end
