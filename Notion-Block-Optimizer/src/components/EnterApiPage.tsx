import { Client } from '@notionhq/client';
import React, { useState, ChangeEvent, FormEvent } from 'react';

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
    
    const notion = new Client({ auth: api });

    try {
      const response = await notion.blocks.children.append({
        block_id: page,
        children: [
          {
            object: 'block',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content:
                      "🔥 테스트 성공! 두 줄 개행도 가능.\n\n\n\n\n\n\n정말 한 블록인가 확인해보자!",
                  },
                },
              ],
            },
          },
        ],
      });

      console.log("Block added:", response);
      alert("블록이 성공적으로 추가되었습니다!");
    } catch (error) {
      console.error("Error adding block:", error);
      alert("블록 추가에 실패했습니다. 콘솔을 확인해주세요.");
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
