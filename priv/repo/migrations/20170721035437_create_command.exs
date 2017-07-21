defmodule RoboViewer.Repo.Migrations.CreateCommand do
  use Ecto.Migration

  def change do
    create table(:command) do

      timestamps()
    end

  end
end
