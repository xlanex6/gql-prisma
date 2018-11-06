const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-1",
    name: "alex",
    url: "www.alex.fr"
  },
  {
    id: "link-2",
    name: "julien",
    url: "www.julien.fr"
  },
  {
    id: "link-2",
    name: "eric",
    url: "www.eric.fr"
  }
];
let idCount = links.length + 1;
const resolvers = {
  Query: {
    info: () => "Hello graphql devs",
    feed: () => links,
    getLink: (root, { id }) => {
      return links.find(l => l.id === id);
    }
  },
  Mutation: {
    createLink(root, { name, url }) {
      const newLink = {
        id: `link-${idCount++}`,
        url,
        name
      };
      links.push(newLink);
      return newLink;
    },
    updateLink(root, { id, name, url }) {
      const index = links.findIndex(link => link.id === id);
      if (url) {
        links[index].url = url;
      }
      if (name) {
        links[index].name = name;
      }
      return links[index];
    },
    deleteLink(root, { id }) {
      const index = links.findIndex(link => link.id === id);
      links.splice(index, 1);
      return links[index];
    }
  },
  Link: {
    id(root, args, ctx, info) {
      return root.id;
    },
    name(root, args, ctx, info) {
      return root.name;
    },
    url(root, args, ctx, info) {
      return root.url;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log("server is running at localhost:4000"));
