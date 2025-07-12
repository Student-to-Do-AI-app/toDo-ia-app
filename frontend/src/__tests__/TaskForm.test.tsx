import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../pages/TaskForm";

describe("TaskForm", () => {
  test("renderiza inputs y botón", () => {
    render(<TaskForm onSubmit={jest.fn()} />);

    expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
    // Cambiamos aquí para que coincida con el placeholder real:
    expect(
      screen.getByPlaceholderText(/Task ID to update/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
  });

  test("envía datos al hacer submit", () => {
    const mockSubmit = jest.fn();
    render(<TaskForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: "Tarea test" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), {
      target: { value: "Descripción test" },
    });
    // Cambiamos aquí también:
    fireEvent.change(screen.getByPlaceholderText(/Task ID to update/i), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(mockSubmit).toHaveBeenCalledWith(
      { title: "Tarea test", description: "Descripción test" },
      123
    );
  });
});
