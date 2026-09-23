import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FileUpload from "./uploadFile";

describe("FileUpload Component", () => {
  let user;
  const mockOnUpload = vi.fn();

  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
  });

  it("uploads a valid image using the file input", async () => {
    render(<FileUpload onUpload={mockOnUpload} />);

    // 1. Create a dummy File object in memory
    const validFile = new File(["dummy content"], "avatar.png", {
      type: "image/png",
    });

    const fileInput = screen.getByLabelText(/upload avatar/i);

    // 2. Use userEvent.upload to simulate selecting a file
    await user.upload(fileInput, validFile);

    // 3. Assert input DOM state and component callback
    expect(fileInput.files[0]).toBe(validFile);
    expect(fileInput.files).toHaveLength(1);
    expect(screen.getByText(/uploaded: avatar\.png/i)).toBeInTheDocument();
    // C. Callback Execution
    expect(mockOnUpload).toHaveBeenCalledTimes(1);
    expect(mockOnUpload).toHaveBeenCalledWith(validFile);
  });

  it("rejects files with invalid mime types (e.g. PDF)", async () => {
    render(<FileUpload onUpload={mockOnUpload} />);

    const pdfFile = new File(["pdf data"], "document.pdf", {
      type: "application/pdf",
    });

    const fileInput = screen.getByLabelText(/upload avatar/i);
    await user.upload(fileInput, pdfFile);

    // Assert error state and prevented callback
    expect(screen.getByRole("alert")).toHaveTextContent(
      /only png and jpeg images are allowed/i,
    );
    expect(mockOnUpload).not.toHaveBeenCalled();
  });

  it("handles drag and drop file upload via drop zone", () => {
    render(<FileUpload onUpload={mockOnUpload} />);

    const droppedFile = new File(["image data"], "photo.jpeg", {
      type: "image/jpeg",
    });

    const dropZone = screen.getByTestId("drop-zone");

    // Fire synthetic drop event with populated dataTransfer
    fireEvent.drop(dropZone, {
      dataTransfer: {
        files: [droppedFile],
      },
    });

    expect(screen.getByText(/uploaded: photo\.jpeg/i)).toBeInTheDocument();
    expect(mockOnUpload).toHaveBeenCalledWith(droppedFile);
  });
});
