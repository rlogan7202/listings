var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info'
});

var indexName = 'books';
var indexType = 'book';

function indexExists() {
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;

function initIndex() {
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

function deleteIndex() {
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

function create(book) {
    return elasticClient.index({
        id: book.id,
        index: indexName,
        type: indexType,
        body: book
    }).then(function (response) {
        console.log(response.result + ' ' + response._id + ' ' + response._version);
      }, function (error) {
        console.trace(error.message);
      });
}
exports.create = create;