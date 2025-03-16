
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";

interface NewsItem {
  id: string;
  date: string;
  content: string;
}

const CandlingoNews: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      id: '1',
      date: '2024-03-15',
      content: '500 new IT terms added to Public Dictionary'
    },
    {
      id: '2',
      date: '2024-03-15',
      content: 'Updates to Personal Dictionaries'
    },
    {
      id: '3',
      date: '2024-03-15',
      content: 'This week your recruiters consolidated 100 new terms to the glossary'
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-candilingo-purple flex items-center">
            <Bell className="mr-2 h-4 w-4 text-candilingo-pink" />
            Candilingo News
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {newsItems.map((item) => (
              <div key={item.id} className="border-b pb-3 last:border-0">
                <p className="text-sm text-gray-500 mb-1">{item.date}</p>
                <p className="text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CandlingoNews;
