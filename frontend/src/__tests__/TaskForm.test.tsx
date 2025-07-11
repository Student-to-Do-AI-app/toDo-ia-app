import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../pages/TaskForm";

describe("TaskForm", () => {
  test("renderiza inputs y botón", () => {
    render(<TaskForm onSubmit={jest.fn()} />);

    expect(screen.getByPlaceholderText(/Título/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Descripción/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Id para modificar/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Agregar tarea/i })
    ).toBeInTheDocument();
  });

  test("envía datos al hacer submit", () => {
    const mockSubmit = jest.fn();
    render(<TaskForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByPlaceholderText(/Título/i), {
      target: { value: "Tarea test" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Descripción/i), {
      target: { value: "Descripción test" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Id para modificar/i), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Agregar tarea/i }));

    expect(mockSubmit).toHaveBeenCalledWith(
      { title: "Tarea test", description: "Descripción test" },
      123
    );
  });
});
