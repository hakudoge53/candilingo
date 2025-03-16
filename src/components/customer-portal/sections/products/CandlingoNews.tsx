
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Calendar } from "lucide-react";

interface NewsItem {
  id: string;
  date: string;
  content: string;
}

const CandlingoNews: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      id: '1',
      date: '2023-09-15',
      content: '500 new IT terms added to Public Dictionary'
    },
    {
      id: '2',
      date: '2023-09-10',
      content: 'Updates to Personal Dictionaries'
    },
    {
      id: '3',
      date: '2023-09-05',
      content: 'This week your recruiters consolidated 100 new terms to the glossary'
    },
    {
      id: '4',
      date: '2023-09-01',
      content: 'New Web Extension features released'
    },
    {
      id: '5',
      date: '2023-08-28',
      content: 'Improved search functionality for all glossaries'
    }
  ];

  return (
    <Card className="border border-gray-100 shadow-sm h-full">
      <CardHeader className="pb-2 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-candilingo-purple flex items-center">
            <Bell className="mr-2 h-4 w-4 text-candilingo-pink" />
            Candilingo News
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <div className="divide-y">
            {newsItems.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  {item.date}
                </div>
                <p className="text-sm text-gray-700">{item.content}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CandlingoNews;
