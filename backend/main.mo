import Nat "mo:base/Nat";
import Order "mo:base/Order";

import Array "mo:base/Array";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Text "mo:base/Text";

actor {
  type Post = {
    id: Nat;
    title: Text;
    body: Text;
    author: Text;
    timestamp: Time.Time;
  };

  stable var nextPostId: Nat = 0;
  stable var posts: [Post] = [];

  public func createPost(title: Text, body: Text, author: Text): async Result.Result<Nat, Text> {
    let post: Post = {
      id = nextPostId;
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
    };
    posts := Array.append(posts, [post]);
    nextPostId += 1;
    #ok(post.id)
  };

  public query func getPosts(): async [Post] {
    Array.sort(posts, func(a: Post, b: Post): Order.Order {
      if (a.timestamp > b.timestamp) { #less }
      else if (a.timestamp < b.timestamp) { #greater }
      else { #equal }
    })
  };
}
