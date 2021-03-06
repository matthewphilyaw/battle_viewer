defmodule RoboViewer.CommandControllerTest do
  use RoboViewer.ConnCase

  alias RoboViewer.Command
  @valid_attrs %{}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, command_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    command = Repo.insert! %Command{}
    conn = get conn, command_path(conn, :show, command)
    assert json_response(conn, 200)["data"] == %{"id" => command.id}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, command_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, command_path(conn, :create), command: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Command, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, command_path(conn, :create), command: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    command = Repo.insert! %Command{}
    conn = put conn, command_path(conn, :update, command), command: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Command, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    command = Repo.insert! %Command{}
    conn = put conn, command_path(conn, :update, command), command: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    command = Repo.insert! %Command{}
    conn = delete conn, command_path(conn, :delete, command)
    assert response(conn, 204)
    refute Repo.get(Command, command.id)
  end
end
