"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { 
  MessageSquare, 
  Bookmark, 
  BookmarkCheck, 
  Plus, 
  Search,
  Tag,
  Tags
} from 'lucide-react';
import { toast } from '../../../hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  tags: string[];
  subject: string;
  comments: Comment[];
  bookmarks: number;
  isBookmarked: boolean;
  createdAt: string;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
}

const subjects = ['Mathematics', 'Science', 'English', 'History', 'Computer Science', 'Languages', 'Art', 'Other'];
const studyMethods = ['Flashcards', 'Mind Maps', 'Pomodoro', 'Group Study', 'Practice Tests', 'Note Taking', 'Active Recall', 'Spaced Repetition'];

const StudyBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'How I Improved My Math Grades Using the Feynman Technique',
      content: 'After struggling with calculus for months, I discovered the Feynman Technique. By explaining concepts in simple terms, I finally understood derivatives and integrals. Here\'s my step-by-step process...',
      author: 'Sarah Chen',
      avatar: 'SC',
      tags: ['Feynman Technique', 'Active Learning', 'Problem Solving'],
      subject: 'Mathematics',
      comments: [
        {
          id: '1',
          author: 'Mike Johnson',
          avatar: 'MJ',
          content: 'This is brilliant! I\'ve been struggling with the same concepts. Thanks for sharing your method.',
          createdAt: '2 hours ago'
        }
      ],
      bookmarks: 24,
      isBookmarked: false,
      createdAt: '5 hours ago'
    },
    {
      id: '2',
      title: 'My 30-Day Study Schedule That Got Me Into MIT',
      content: 'Planning was everything. I created a detailed 30-day study plan that balanced all subjects while focusing on my weak areas. The key was consistency and regular review sessions...',
      author: 'Alex Rodriguez',
      avatar: 'AR',
      tags: ['Study Planning', 'Time Management', 'College Prep'],
      subject: 'Other',
      comments: [],
      bookmarks: 89,
      isBookmarked: true,
      createdAt: '1 day ago'
    }
  ]);

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    subject: '',
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');
  const [commentInputs, setCommentInputs] = useState<{[key: string]: string}>({});

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = filterSubject === 'all' || post.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content || !newPost.subject) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const post: BlogPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: 'You',
      avatar: 'YU',
      tags: newPost.tags,
      subject: newPost.subject,
      comments: [],
      bookmarks: 0,
      isBookmarked: false,
      createdAt: 'Just now'
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', subject: '', tags: [] });
    setShowCreatePost(false);
    toast({
      title: "Post Created!",
      description: "Your study blog post has been published."
    });
  };

  const handleAddTag = () => {
    if (newTag && !newPost.tags.includes(newTag)) {
      setNewPost({ ...newPost, tags: [...newPost.tags, newTag] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewPost({ ...newPost, tags: newPost.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isBookmarked: !post.isBookmarked,
            bookmarks: post.isBookmarked ? post.bookmarks - 1 : post.bookmarks + 1
          }
        : post
    ));
    
    const post = posts.find(p => p.id === postId);
    toast({
      title: post?.isBookmarked ? "Bookmark Removed" : "Post Bookmarked",
      description: post?.isBookmarked ? "Removed from your saved posts." : "Added to your saved posts."
    });
  };

  const handleAddComment = (postId: string) => {
    const commentText = commentInputs[postId];
    if (!commentText?.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'YU',
      content: commentText,
      createdAt: 'Just now'
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));

    setCommentInputs({ ...commentInputs, [postId]: '' });
    toast({
      title: "Comment Added",
      description: "Your comment has been posted."
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">📝 Study Blog Forum</h2>
        <p className="text-gray-600 dark:text-gray-400">Share your study journeys, techniques, and tips with the community.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search posts, tags, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterSubject} onValueChange={setFilterSubject}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          onClick={() => setShowCreatePost(!showCreatePost)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Create Post Form */}
      {showCreatePost && (
        <Card className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Create New Study Blog Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Post title..."
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              placeholder="Share your study experience, techniques, or tips..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              rows={4}
            />
            <div className="flex gap-2">
              <Select value={newPost.subject} onValueChange={(value:string) => setNewPost({ ...newPost, subject: value })}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button onClick={handleAddTag} variant="outline">
                  <Tag className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {newPost.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">Suggested tags:</span>
                {studyMethods.map(method => (
                  <Badge 
                    key={method}
                    variant="outline"
                    className="cursor-pointer text-xs"
                    onClick={() => !newPost.tags.includes(method) && setNewPost({ ...newPost, tags: [...newPost.tags, method] })}
                  >
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreatePost}>Publish Post</Button>
              <Button variant="outline" onClick={() => setShowCreatePost(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Blog Posts */}
      <div className="space-y-6">
        {filteredPosts.map(post => (
          <Card key={post.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{post.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{post.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      by {post.author} • {post.createdAt}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBookmark(post.id)}
                  className="text-gray-600 dark:text-gray-400"
                >
                  {post.isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                  {post.bookmarks}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                  <Tags className="w-3 h-3 mr-1" />
                  {post.subject}
                </Badge>
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>

              {/* Comments Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {post.comments.map(comment => (
                  <div key={comment.id} className="flex gap-3 mb-3 pl-4 border-l-2 border-gray-100 dark:border-gray-700">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">{comment.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{comment.author}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{comment.createdAt}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                    </div>
                  </div>
                ))}

                <div className="flex gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    className="flex-1"
                  />
                  <Button 
                    size="sm" 
                    onClick={() => handleAddComment(post.id)}
                    disabled={!commentInputs[post.id]?.trim()}
                  >
                    Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent>
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No posts found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm || filterSubject !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'Be the first to share your study journey!'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudyBlog;