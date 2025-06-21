
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Send, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminPanel = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  const getSubscriberCount = async () => {
    try {
      const { count, error } = await supabase
        .from('email_subscriptions')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      if (error) throw error;
      setSubscriberCount(count || 0);
    } catch (error) {
      console.error('Error fetching subscriber count:', error);
    }
  };

  const sendNotifications = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-deadline-notifications');
      
      if (error) throw error;
      
      toast({
        title: "Notifications sent!",
        description: data.message,
        variant: "default",
      });
    } catch (error) {
      console.error('Error sending notifications:', error);
      toast({
        title: "Failed to send notifications",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getSubscriberCount();
  }, []);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Users className="w-5 h-5" />
          <span>Email Notifications</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {subscriberCount !== null ? subscriberCount : '...'}
          </p>
          <p className="text-sm text-gray-600">Active Subscribers</p>
        </div>
        
        <Button 
          onClick={sendNotifications}
          disabled={isLoading || subscriberCount === 0}
          className="w-full"
        >
          <Send className="w-4 h-4 mr-2" />
          {isLoading ? 'Sending...' : 'Send Reminder Emails'}
        </Button>
        
        <Button 
          onClick={getSubscriberCount}
          variant="outline"
          className="w-full"
        >
          Refresh Count
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminPanel;
