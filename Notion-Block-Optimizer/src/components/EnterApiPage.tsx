import React, { useState, ChangeEvent, FormEvent } from 'react';
import { pushToNotion } from '../api/post';

const EnterApiandPage: React.FC = () => {
  const [api, setApi] = useState<string>("");
  const [page, setPage] = useState<string>("");

  const handleApiChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setApi(e.target.value);
  };

  const handlePageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPage(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    const response = await pushToNotion(api,page);

    if(response?.success) {
      alert("Successfully added block to Notion!");
    } else {
      alert("Failed to add block to Notion");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input 
          type="text" 
          value={api} 
          onChange={handleApiChange} 
          placeholder="Enter API Key..."
        />
      </div>
      <div>
        <input 
          type="text" 
          value={page} 
          onChange={handlePageChange} 
          placeholder="Enter Page ID..."
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EnterApiandPage;
